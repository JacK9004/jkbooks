import { NestFactory } from '@nestjs/core';
import { JkbooksBatchModule } from './jkbooks-batch.module';

async function bootstrap() {
  const app = await NestFactory.create(JkbooksBatchModule);
  await app.listen(3000);
}
bootstrap();
