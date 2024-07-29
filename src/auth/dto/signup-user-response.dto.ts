import { IsEmail, IsNotEmpty, IsString, IsNumber, MinLength, MaxLength, IsDate, validate } from 'class-validator';
import IUser from "src/constants/interface/user";
import { OmitType } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';

export class SignupUserResponseDto extends OmitType(User, ['wishlists', 'wishes', 'offers'] as const){}