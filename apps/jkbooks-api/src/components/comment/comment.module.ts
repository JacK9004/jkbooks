import { Module } from '@nestjs/common';
import { CommentResolver } from './comment.resolver';
import { CommentService } from './comment.service';
import { AuthModule } from '../auth/auth.module';
import { MemberModule } from '../member/member.module';
import { BookModule } from '../book/book.module';
import { BoardArticleModule } from '../board-article/board-article.module';
import { MongooseModule } from '@nestjs/mongoose';
import CommentSchema from '../../schemas/Comment.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Comment',
        schema: CommentSchema,
      },
    ]),
    AuthModule,
    MemberModule,
    BookModule,
    BoardArticleModule
  ],
  providers: [CommentResolver, CommentService]
})
export class CommentModule {}
