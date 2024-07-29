import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, IsOptional } from 'class-validator';
import IUser from 'src/constants/interface/user';

export class SigninUserDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(64)
    username: IUser['username'];

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    password: IUser['password'];
}
