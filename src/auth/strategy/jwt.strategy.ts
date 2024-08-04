import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {  
    constructor (
        private configService: ConfigService,
        private usersService: UsersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('jwt.secret') || 'secret',
        });
    }

    async validate(jwtPayload: { sub: number }) {
        const {password, ...userData} = await this.usersService.getUserById(jwtPayload.sub)
        return userData
    }
}