import { ArgumentsHost, Catch, ConflictException, ExceptionFilter, HttpException, NotFoundException } from "@nestjs/common";
import { Response } from "express";
import { EntityNotFoundError, NotAcceptedFields} from "typeorm";

import { DEFAULT_ERRORS } from "src/constants/constants";

@Catch(HttpException)
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
        } 
        if (exception instanceof ConflictException) {
            status = DEFAULT_ERRORS.userAlreadyExists.statusCode;
            message = exception.message || DEFAULT_ERRORS.userAlreadyExists.message;  
        } 
        if (exception instanceof HttpException) {
            const responseBody = exception.getResponse() as { message?: string };
            status = exception.getStatus();
            message = responseBody.message || DEFAULT_ERRORS.default.message;  
        } 
        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message,
        });
    }
}