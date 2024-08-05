import { IsNotEmpty, IsJWT } from 'class-validator';

export class SigninUserResponseDto {
    @IsNotEmpty()
    @IsJWT()
    access_token: string 
}