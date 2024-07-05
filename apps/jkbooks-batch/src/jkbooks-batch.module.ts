import { Module } from '@nestjs/common';
import { JkbooksBatchController } from './jkbooks-batch.controller';
import { JkbooksBatchService } from './jkbooks-batch.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [JkbooksBatchController],
  providers: [JkbooksBatchService],
})
export class JkbooksBatchModule {}
