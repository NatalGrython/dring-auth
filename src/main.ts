import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Drag auth service')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const configService = app.get(ConfigService);

  const port = configService.get<string>('PORT');

  app.enableCors();

  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}

bootstrap();
