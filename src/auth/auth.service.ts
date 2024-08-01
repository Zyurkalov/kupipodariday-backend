import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from 'src/auth/dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import IUser from 'src/constants/interface/user';
import { Repository } from 'typeorm';
import { hashValue, verifyHash } from 'src/helpers/hash';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
constructor(
  private readonly userService: UsersService,
  private readonly jwtService: JwtService,
) {}
  async login(user: User) {
    const {username, id: sub} = user;
    // переименовали id в sub согласно документации
    return {
      access_token: await this.jwtService.signAsync({username, sub})
    }
  }

  // update(id: IUser['id'], updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: IUser['id']) {
  //   return `This action removes a #${id} auth`;
  // }

  async validateUser(username: IUser['username'], password: IUser['password']): Promise<any> {
    const user = await this.userService.findOneUser({
      select: {username: true, password: true, id: true},
      where: {username}
    })
    if(user && (await verifyHash(password, user.password))) {
      const {password, ...userData} = user;
      return userData
    }

    if(!user) {
      throw new UnauthorizedException(
          'неправильное имя пользователя или пароль'
      )
    }
    return null
  }
}
