import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import databaseConfig from './config/database.config';
import { DatabaseModule } from './database/database.module';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { TransactionsModule } from './transactions/transactions.module';
import * as Joi from 'joi';
import appConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
      validationSchema: Joi.object({
        MYSQL_HOST: Joi.string().required(),
        MYSQL_PORT: Joi.number().required(),
        MYSQL_USER: Joi.string().required(),
        MYSQL_PASSWORD: Joi.string().required(),
        MYSQL_DATABASE: Joi.string().required(),
        HOST: Joi.string().required(),
        PORT: Joi.number().default(8000),
      }),
    }),
    DatabaseModule,
    TransactionsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
