import { NestFactory } from '@nestjs/core';
import { ProductAppModule } from './product-app.module';

async function bootstrap() {
  const app = await NestFactory.create(ProductAppModule);
  await app.listen(3001);
}
bootstrap();
