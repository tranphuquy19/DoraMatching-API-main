import { CommentPostService } from '@comment-post/comment-post.service';
import { CommentPostParams, CreateCommentPostDTO, UpdateCommentPostDTO } from '@comment-post/dto';
import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from '@shared/auth/auth.decorator';
import { FindOneParams } from '@shared/pipes/find-one.params';
import { JwtUser } from '@user/dto';
import { User } from '@user/user.decorator';

@ApiTags('post')
@Controller()
export class CommentPostController {
    constructor(
        private readonly commentPostService: CommentPostService,
    ) {
    }

    @Auth()
    @ApiOperation({ summary: 'Create post comment', description: 'Create a comment with postId' })
    @Post('post/:id/comment')
    createComment(@Param() { id }: FindOneParams, @Body() data: CreateCommentPostDTO, @User() jwtUser: JwtUser) {
        return this.commentPostService.createComment(id, data, jwtUser);
    }

    @Auth()
    @ApiOperation({ summary: 'Update post comment', description: 'Update post comment' })
    @Patch('/post/:id/comment/:commentId')
    updateCommentById(@Param() params: CommentPostParams, @Body() data: UpdateCommentPostDTO, @User() jwtUser: JwtUser) {
        return this.commentPostService.updateCommentById(params, data, jwtUser);
    }

    @Auth()
    @ApiOperation({ summary: 'Delete post comment', description: 'Return delete status' })
    @Delete('/post/:id/comment/:commentId')
    deleteCommentById(@Param() params: CommentPostParams, @User() jwtUser: JwtUser) {
        return this.commentPostService.deleteCommentById(params, jwtUser);
    }
}
