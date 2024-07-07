import { Module } from '@nestjs/common';
import { MemberModule } from './member/member.module';
import { BookModule } from './book/book.module';

@Module({
  imports: [MemberModule, BookModule]
})
export class ComponentsModule {}
