import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { ValidationConfig } from './config/validation.config';
import { runDbMigrations } from './database/db.migration';
import { ResponseTransformInterceptor } from './shared/interceptors/response-transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  const options = new DocumentBuilder()
    .setTitle('API docs')
    .addTag('products')
    .addTag('users')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe(ValidationConfig));
  app.useGlobalInterceptors(new ResponseTransformInterceptor());
  app.setGlobalPrefix(configService.get('API_PREFIX'));

  await runDbMigrations();

  Logger.log(`Server is open on PORT ${port}`);
  await app.listen(port);
}
bootstrap();
