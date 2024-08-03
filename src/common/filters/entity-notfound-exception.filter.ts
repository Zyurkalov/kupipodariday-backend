import { ArgumentsHost, Catch, ExceptionFilter, NotFoundException } from "@nestjs/common";
import { Response } from "express";
import { DEFAULT_ERRORS } from "src/constants/constants";
import { EntityNotFoundError} from "typeorm";


@Catch(NotFoundException)
export class NotFoundFilter implements ExceptionFilter { 
    catch(exception: NotFoundException, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        // const request = ctx.getRequest<Request>();

        response.status(404).json({
            message: DEFAULT_ERRORS.notFound
        });
    }
}