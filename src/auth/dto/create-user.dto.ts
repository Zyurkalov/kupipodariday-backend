import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, IsOptional } from 'class-validator';
import { DEFAULT_VALUES } from 'src/constants/constants';
import IUser from 'src/constants/interface/user';

export default class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(64)
    username: IUser['username'];

    @IsOptional()
    @IsString()
    @MaxLength(200)
    about?: IUser['about'];

    @IsOptional()
    @IsString()
    avatar?: IUser['avatar'];

    @IsNotEmpty()
    @IsEmail()
    email: IUser['email'];

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    password: IUser['password']

    protected initializeDefaults() {
        if (!this.avatar) {
            this.avatar = DEFAULT_VALUES.avatar;
        }
        if (!this.about) {
            this.about = DEFAULT_VALUES.about;
        }
    }

    constructor(actualClass: CreateUserDto) {
        Object.assign(this, actualClass);
        this.initializeDefaults();
    }
  }
