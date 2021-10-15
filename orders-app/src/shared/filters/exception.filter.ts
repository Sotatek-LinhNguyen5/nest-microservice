import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces/features/arguments-host.interface';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { MESSAGE } from '../constants/messages.constant';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private static handleResponse(
    response: Response,
    exception: HttpException | QueryFailedError | Error,
  ): void {
    let responseBody: any = { message: MESSAGE.INTERNAL_SERVER_ERROR };
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      responseBody = {
        statusCode: statusCode,
        message: exception.message,
      };
    } else if (exception instanceof QueryFailedError) {
      statusCode = HttpStatus.BAD_REQUEST;
      responseBody = {
        statusCode: statusCode,
        message: exception.message,
      };
    } else if (exception instanceof Error) {
      responseBody = {
        statusCode: statusCode,
        message: exception.stack,
      };
    }

    response.status(statusCode).json(responseBody);
  }

  catch(exception: HttpException | Error, host: ArgumentsHost): void {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: Response = ctx.getResponse();

    this.handleMessage(exception);
    AllExceptionFilter.handleResponse(response, exception);
  }

  private handleMessage(
    exception: HttpException | QueryFailedError | Error,
  ): void {
    let message = MESSAGE.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) {
      message = JSON.stringify(exception.getResponse());
    } else if (exception instanceof QueryFailedError) {
      message = exception.stack.toString();
    } else if (exception instanceof Error) {
      message = exception.stack.toString();
    }

    Logger.error(message);
  }
}
