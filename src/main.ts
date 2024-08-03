import { NestFactory } from '@nestjs/core';
import { ConfigService } from "@nestjs/config"
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NotFoundFilter } from './common/filters/entity-notfound-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)
  const config = new DocumentBuilder()
    .setTitle('Kupi-podari-day') 
    .setDescription('Education project')
    .setVersion('1.0')
    .build();
  const port = await configService.get<number>('API_PORT')
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  
  app.useGlobalFilters(new NotFoundFilter());
  app.useGlobalPipes(new ValidationPipe({transform: true, whitelist: true}))
  await app.listen(port || 3000, () => {
    console.log("Сервер запущен")
  });
}
bootstrap();
