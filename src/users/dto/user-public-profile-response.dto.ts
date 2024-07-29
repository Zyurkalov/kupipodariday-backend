import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, IsOptional } from 'class-validator';
import User from "src/constants/interface/user";

export default class UserPublicProfileResponseDto {
    @IsNotEmpty()
    id: User['id'];

    @IsNotEmpty()
    @IsString()
    @MaxLength(64)
    username: User['about'];

    @IsNotEmpty()
    @IsString()
    @MaxLength(200)
    about: User['about'];

    @IsNotEmpty()
    @IsString()
    avatar: User['avatar'];

    @IsNotEmpty()
    @IsString()
    createdAr: User['createdAt'];

    @IsNotEmpty()
    @IsString()
    updatedAt: User['updatedAt'];
}