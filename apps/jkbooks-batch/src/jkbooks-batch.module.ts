import { Module } from '@nestjs/common';
import { JkbooksBatchController } from './jkbooks-batch.controller';
import { JkbooksBatchService } from './jkbooks-batch.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, ScheduleModule.forRoot()],
  controllers: [JkbooksBatchController],
  providers: [JkbooksBatchService],
})
export class JkbooksBatchModule {}
