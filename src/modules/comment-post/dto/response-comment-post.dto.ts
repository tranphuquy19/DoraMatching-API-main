import { ICommentPostModel } from '@comment-post/dto/comment-post.model';
import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from '@user/dto';

export type ICommentPostRO = ICommentPostModel;

export class CommentPostRO implements ICommentPostRO {
    @ApiProperty()
    content: string;

    @ApiProperty({ type: () => UserModel })
    author: Partial<UserModel>;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
