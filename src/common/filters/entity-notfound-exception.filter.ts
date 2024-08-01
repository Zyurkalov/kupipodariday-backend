import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { EntityNotFoundError } from "typeorm";


@Catch(EntityNotFoundError)
export class EntityNotFoundFilter implements ExceptionFilter { // Исправлено имя класса
    catch(exception: EntityNotFoundError, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        // const request = ctx.getRequest<Request>();

        // response.status(404).json({
        //     message: {
        //         statusCode: 404,
        //         message: 'Объект не найден' // Сообщение с заглавной буквы
        //     }
        // });
    }
}