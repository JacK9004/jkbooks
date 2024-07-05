import { Injectable } from '@nestjs/common';

@Injectable()
export class JkbooksBatchService {
  getHello(): string {
    return 'Welcome to JKbooks-BATCH server!';
  }
}
