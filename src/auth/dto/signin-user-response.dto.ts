import { IsNotEmpty, IsJWT } from 'class-validator';

export class SigninUserResponseDto {
    @IsNotEmpty()
    @IsJWT({
        message: 'Некорректная пара логин и пароль',
        context: {
          errorCode: 401,
          developerNote: 'проверь валидность переданных данных в методе POST auth/signin',
        },
      })
    access_token: string 
}