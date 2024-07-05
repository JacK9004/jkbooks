import { Test, TestingModule } from '@nestjs/testing';
import { JkbooksBatchController } from './jkbooks-batch.controller';
import { JkbooksBatchService } from './jkbooks-batch.service';

describe('JkbooksBatchController', () => {
  let jkbooksBatchController: JkbooksBatchController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [JkbooksBatchController],
      providers: [JkbooksBatchService],
    }).compile();

    jkbooksBatchController = app.get<JkbooksBatchController>(JkbooksBatchController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(jkbooksBatchController.getHello()).toBe('Hello World!');
    });
  });
});
