import { Controller, Get } from '@nestjs/common';
import { JkbooksBatchService } from './jkbooks-batch.service';

@Controller()
export class JkbooksBatchController {
  constructor(private readonly jkbooksBatchService: JkbooksBatchService) {}

  @Get()
  getHello(): string {
    return this.jkbooksBatchService.getHello();
  }
}
