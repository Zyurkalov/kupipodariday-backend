import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";


@Injectable()
export class JwtConfigFactory implements JwtConfigFactory {
    constructor ( private configService: ConfigService) {}

    createJwtOptions(): JwtModuleOptions {
        return {
            secret: this.configService.get<string>('JWT_SECRET'),
            signOptions: {
                expiresIn: this.configService.get<string>('JWT_TTL', '300s'),
            }
        }
    }
}