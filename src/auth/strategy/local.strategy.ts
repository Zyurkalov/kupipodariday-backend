import { Strategy } from "passport-local";
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
        const accessToken = this.authService.validatePassword(username, password)
        if(!accessToken) {
            throw new UnauthorizedException(
                'неправильное имя пользователя или пароль'
            )
        }
        return accessToken
    }
}