import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";
import User from "src/constants/interface/user";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor (
        private authService: AuthService
    ) {
        super()
    }
    validate(username: User['username'], password: User['password'] ): Promise<any> {
        const user = this.authService.validateUser(username, password)
        if(!user) {
            throw new UnauthorizedException(
                'неправильное имя пользователя или пароль'
            )
        }
        return user
    }
}