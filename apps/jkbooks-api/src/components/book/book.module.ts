import { Module } from '@nestjs/common';
import { BookResolver } from './book.resolver';
import { BookService } from './book.service';
import { MongooseModule } from '@nestjs/mongoose';
import BookSchema from '../../schemas/book.model';
import { AuthModule } from '../auth/auth.module';
import { ViewModule } from '../view/view.module';
import { MemberModule } from '../member/member.module';
import { LikeModule } from '../like/like.module';
import { NotificationModule } from '../notification/notification.module';
import MemberSchema from '../../schemas/Member.model';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: 'Book', 
      schema: BookSchema
    }
  ]), 
  MongooseModule.forFeature([{ name: 'Member', schema: MemberSchema }]),
  AuthModule,
  ViewModule,
  MemberModule,
  LikeModule,
  NotificationModule,
],
  providers: [BookResolver, BookService],
  exports: [BookService],
})
export class BookModule {}
