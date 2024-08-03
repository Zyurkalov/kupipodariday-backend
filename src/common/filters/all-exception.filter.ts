import { ArgumentsHost, Catch, ExceptionFilter, HttpException, NotFoundException } from "@nestjs/common";
import { Response } from "express";
import { EntityNotFoundError} from "typeorm";

import { DEFAULT_ERRORS } from "src/constants/constants";


@Catch(NotFoundException)
export class AllExceptionFilter implements ExceptionFilter { 
    catch(exception: unknown, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        // значения по умолчанию:
        let status = DEFAULT_ERRORS.default.statusCode; 
        let message = DEFAULT_ERRORS.default.message;

        if(exception instanceof EntityNotFoundError) {
            status = DEFAULT_ERRORS.notFound.statusCode;
            message = DEFAULT_ERRORS.notFound.message

        } else if (exception instanceof HttpException) {
            const responseBody = exception.getResponse();
            status = exception.getStatus();
            message = (responseBody as any).message || DEFAULT_ERRORS.default.message;
        }
        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message,
        });
    }
}