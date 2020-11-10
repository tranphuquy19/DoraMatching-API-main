import { IClasseModel } from '@classe/dto';
import { TopicRO } from '@topic/dto';
import { Type } from 'class-transformer';
import { IsArray, IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, ValidateNested } from 'class-validator';
import { TraineeRO } from '@trainee/dto';
import { ApiProperty } from '@nestjs/swagger';
import { UserRO } from '@user/dto';

export type ICreateClasseDTO = Pick<IClasseModel, 'name' | 'description' | 'featuredImage' | 'startTime' | 'endTime' | 'topic' | 'duration' | 'members'>;

export class CreateClasseDTO implements ICreateClasseDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsUrl()
    featuredImage: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    duration: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    startTime: Date;

    @ApiProperty()
    @IsOptional()
    @IsDateString()
    endTime: Date;

    @ApiProperty({ type: () => TraineeRO, isArray: true })
    @IsOptional()
    @IsArray()
    @ValidateNested()
    @Type(() => TraineeRO)
    members: TraineeRO[];

    @ApiProperty({ type: () => TopicRO })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => TopicRO)
    topic: TopicRO;
}
