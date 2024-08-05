import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { User } from "src/users/entities/user.entity";
import { SigninUserDto } from "src/auth/dto/signin-user.dto";

export const AuthUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): SigninUserDto => {
        const request = ctx.switchToHttp().getRequest();
        return request.user; // извлекаем пользователя из запроса

        // return <UserProfileResponseDto>instanceToPlain(user);
        // instanceToPlain(user) - преобразует user, в нашем случае экземпляр User - в объект
        // <UserProfileResponseDto> указывает, какие типы должны быть извлечены из instanceToPlain(user)
    },
);