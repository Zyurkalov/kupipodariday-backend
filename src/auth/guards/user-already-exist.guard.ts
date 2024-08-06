import {
    CanActivate, ConflictException, ExecutionContext, Injectable, Logger
} from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { Request } from 'express';

@Injectable()
export class UserAlreadyExist implements CanActivate {
    private readonly logger = new Logger('UserAlreadyExist');
    
    constructor(
        private readonly userService: UsersService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest<Request>();

        const { username, email } = request.body;
        const currentUser = await this.userService.findUserByBody(username, email)

        // try {
        //     if (currentUser) {
        //         throw new ConflictException(
        //             'Такой пользователь уже существует'
        //         )
        //     }
        // } catch (err) {
        //     this.logger.error(
        //         `отклонена попытка авторизации пользователя: 
        //         ${username} ел.почта: ${email}: ${err.message}`
        //     );
        //     throw err;
        // }
        if (currentUser) {
            this.logger.error(
                `отклонена попытка авторизации пользователя: 
                ${username} ел.почта: ${email}: Пользователь уже существует`
            );
            throw new ConflictException('Такой пользователь уже существует');
        }
        
        return true
    }
}