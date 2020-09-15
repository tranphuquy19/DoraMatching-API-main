import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { PaginateParams } from 'src/shared/pipes.params';
import { Repository } from 'typeorm';
import { UserDTO, UserRO } from './user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) { }

    async showAll(pOptions: PaginateParams): Promise<Pagination<UserEntity>> {
        // const users = await this.userRepository.find({});
        // return users.map(user => user.toResponseObject(false));
        return paginate<UserEntity>(this.userRepository, pOptions, { order: { id: pOptions.order } });
    }

    async findByUsername(username: string): Promise<UserRO> {
        const user = await this.userRepository.findOne({
            where: { username }
        });
        return user.toResponseObject(false);
    }

    async login(data: UserDTO): Promise<UserRO> {
        const { username, password } = data;
        const user = await this.userRepository.findOne({ where: { username } });
        if (!user || !(await user.comparePassword(password))) {
            throw new HttpException('Invalid username/password', HttpStatus.FORBIDDEN);
        }
        return user.toResponseObject();
    }

    async register(data: UserDTO): Promise<UserRO> {
        const { username } = data;
        let user = await this.userRepository.findOne({ where: { username } });
        if (user) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        user = await this.userRepository.create(data);
        await this.userRepository.save(user);
        return user.toResponseObject();
    }
}