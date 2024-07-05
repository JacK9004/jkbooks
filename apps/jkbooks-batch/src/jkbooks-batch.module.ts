import { Module } from '@nestjs/common';
import { JkbooksBatchController } from './jkbooks-batch.controller';
import { JkbooksBatchService } from './jkbooks-batch.service';

@Module({
  imports: [],
  controllers: [JkbooksBatchController],
  providers: [JkbooksBatchService],
})
export class JkbooksBatchModule {}
