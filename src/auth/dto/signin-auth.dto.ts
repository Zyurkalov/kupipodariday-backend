import { PartialType } from '@nestjs/swagger';
import { CreateAuthDto } from './create-auth.dto';

export class SigninAuthDto extends PartialType(CreateAuthDto) {
    about: string;
    avatar: string;
    email: string;
}
