import { Module } from '@nestjs/common';
import { BookResolver } from './book.resolver';
import { BookService } from './book.service';
import { MongooseModule } from '@nestjs/mongoose';
import BookSchema from '../../schemas/book.model';
import { AuthModule } from '../auth/auth.module';
import { ViewModule } from '../view/view.module';
import { MemberModule } from '../member/member.module';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: 'Book', 
      schema: BookSchema
    }
  ]), 
  AuthModule,
  ViewModule,
  MemberModule,
],
  providers: [BookResolver, BookService],
  exports: [BookService],
})
export class BookModule {}
