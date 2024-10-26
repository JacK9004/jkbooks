import { Module } from '@nestjs/common';
import { MemberModule } from './member/member.module';
import { BookModule } from './book/book.module';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { ViewModule } from './view/view.module';
import { BoardArticleModule } from './board-article/board-article.module';
import { FollowModule } from './follow/follow.module';
import { NotificationModule } from './notification/notification.module';
import { MessageModule } from './message/message.module';
import { FaqModule } from './faq/faq.module';
import { NoticeModule } from './notice/notice.module';

@Module({
  imports: [
    MemberModule,
    AuthModule,  
    BookModule, 
    BoardArticleModule,    
    LikeModule, 
    ViewModule,
    CommentModule, 
    FollowModule, 
    NotificationModule,
    MessageModule, 
    FaqModule,
    NoticeModule
  ],
})
export class ComponentsModule {}
