import { IsEmail, IsNotEmpty, IsString, IsNumber, MinLength, MaxLength, IsDate, validate } from 'class-validator';
import IUser from "src/constants/interface/user";

export default class SignupUserResponseDto {

@IsNotEmpty()
@IsNumber()
id: IUser['id'];

@IsNotEmpty()
@IsString()
@MinLength(1)
@MaxLength(64)
username: IUser['username'];

@IsNotEmpty()
@IsString()
@MaxLength(200)
about?: IUser['about'];

@IsNotEmpty()
@IsString()
avatar?: IUser['avatar'];

@IsNotEmpty()
@IsEmail()
email: IUser['email'];

@IsNotEmpty()
@IsString()
@MinLength(2)
password: IUser['password']

@IsNotEmpty()
@IsDate()
createdAt: IUser['createdAt'];

@IsNotEmpty()
@IsDate()
updatedAt: IUser['updatedAt'];
}