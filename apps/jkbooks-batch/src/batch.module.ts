import { Module } from '@nestjs/common';
import { BatchController } from './batch.controller';
import { BatchService } from './batch.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import BookSchema from 'apps/jkbooks-api/src/schemas/book.model';
import MembberSchema from 'apps/jkbooks-api/src/schemas/Member.model';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    DatabaseModule, 
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([{ name: 'Book', schema: BookSchema}]),
    MongooseModule.forFeature([{ name: 'Member', schema: MembberSchema}]),
  ],

  controllers: [BatchController],
  providers: [BatchService],
})
export class BatchModule {}
