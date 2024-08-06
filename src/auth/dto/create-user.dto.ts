import { PickType, IntersectionType, PartialType, ApiProperty } from '@nestjs/swagger';
import { BaseEntityForIdAndDate } from 'src/constants/entity/base-entity';
import { User } from 'src/users/entities/user.entity';

export class CreateUserDto extends IntersectionType( 
  PickType(User, ['username', 'email', 'password'] as const),
  PartialType(PickType(User, ['about', 'avatar'] as const)),
  ) {}

// import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

// export class CreateUserDto {
//     @ApiProperty()
//     @IsString()
//     @IsNotEmpty()
//     username: string;

//     @ApiProperty()
//     @IsNotEmpty()
//     @IsEmail()
//     email: string;

//     @ApiProperty()
//     @IsString()
//     @IsNotEmpty()
//     password: string;

//     @ApiProperty({required: false})
//     @IsString()
//     about?: string;

//     @ApiProperty({required: false})
//     @IsString()
//     avatar?: string;
// }