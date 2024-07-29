import { IsEmail, IsNotEmpty, IsString, IsUrl, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column } from 'typeorm';

import { BaseEntityForIdAndDate } from 'src/constants/entity/base.entity';
import { DEFAULT_VALUES, maxLength_username, maxLength_about, minLength } from 'src/constants/constants';
import IUser from "src/constants/interface/user";

@Entity()
export class User extends BaseEntityForIdAndDate {

    @ApiProperty({ description: "имя пользователя", example: DEFAULT_VALUES.user, })
    @IsNotEmpty()
    @IsString()
    @Length(minLength, maxLength_username)
    @Column({ unique: true })
    username: IUser['about'];
//-------------------------------------------
    @ApiProperty({ 
        description: "информация об пользователе", 
        example: DEFAULT_VALUES.about, 
    })
    @Column({ 
        default: DEFAULT_VALUES.about 
    })
    @IsNotEmpty()
    @IsString()
    @Length(minLength, maxLength_about)
    about: IUser['about'];
//-------------------------------------------
    @ApiProperty({
        description: "аватар пользователя",
        example: DEFAULT_VALUES.avatar,
    })
    @Column({ 
        default: DEFAULT_VALUES.avatar 
    })
    @IsNotEmpty()
    @IsUrl()
    avatar: IUser['avatar'];
//-------------------------------------------
    @ApiProperty({ 
        description: "эл.почта пользователя", 
        example: DEFAULT_VALUES.email, 
    })
    @IsNotEmpty()
    @IsEmail()
    @Column({ unique: true })
    email: IUser['email'];
//-------------------------------------------
    @ApiProperty({ 
        description: 'пaроль пользователя', 
        example: 'password123' 
    })
    @IsNotEmpty()
    @Column({ select: false })
    password: IUser['password'];
//-------------------------------------------
    @ApiProperty()
    wishes: IUser['wishes'][];
//-------------------------------------------
    @ApiProperty()
    offers: IUser['offers'][];
//-------------------------------------------
    @ApiProperty()
    wishlists: IUser['wishlist'][];
}
