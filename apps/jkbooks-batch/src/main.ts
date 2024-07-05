import { NestFactory } from '@nestjs/core';
import { JkbooksBatchModule } from './jkbooks-batch.module';

async function bootstrap() {
  const app = await NestFactory.create(JkbooksBatchModule);
  await app.listen(process.env.PORT_BATCH ?? 3000);
}
bootstrap();
