import { Controller, Get, Logger } from '@nestjs/common';
import { BatchService } from './batch.service';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { BATCH_ROLLBACK, BATCH_TOP_PUBLISHERS, BATCH_TOP_BOOKS } from './lib/config';

@Controller()
export class BatchController {
  private logger: Logger = new Logger('BarchController');

  constructor(private readonly batchService: BatchService) {}

  @Timeout(1000)
  handleTimeout() {
    this.logger.debug('BATCH SERVER READY');
  }

  @Cron('00 00 01 * * *', { name: BATCH_ROLLBACK })
  public async batchRollback() {
  try {    
      this.logger['context'] = BATCH_ROLLBACK;
      this.logger.debug('EXECUTED');
      await this.batchService.batchRollback();
    } catch (err) {
    this.logger.error(err);
  }
}

  @Cron('20 00 01 * * *',{ name: BATCH_TOP_BOOKS })
  public async batchTopBooks() {
    try {
      this.logger['context'] = BATCH_TOP_BOOKS;
      this.logger.debug('EXECUTED!');
      await this.batchService.batchTopBooks();
    } catch (err) {
      this.logger.error(err);
    }
  }
  
   
  @Cron('40 00 01 * * *',{ name: BATCH_TOP_PUBLISHERS })
  public async batchTopPublishers() {
    try {
      this.logger['context'] = BATCH_TOP_PUBLISHERS;
      this.logger.debug('EXECUTED');
      await this.batchService.batchTopPublishers();
    } catch (err) {
      this.logger.error(err);
    }
  }

  /*
  @Interval(1000)
  handleInterval() {
    this.logger.debug('INTERVAL TEST');
  }
  */

  @Get()
  getHello(): string {
    return this.batchService.getHello();
  }
}
