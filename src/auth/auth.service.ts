import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import IUser from 'src/constants/interface/user';
import { hashValue, verifyHash } from 'src/helpers/hash';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
constructor(
  @Inject(forwardRef(() => UsersService))
  private readonly userService: UsersService,
  private readonly jwtService: JwtService,
  private readonly configService: ConfigService,
) {}

  async login(user: User) {
    const {username, id: sub} = user;
    // переименовали id в sub согласно документации
    return {
      access_token: this.jwtService.sign({username, sub})
    }
  }

  async validatePassword(username: IUser['username'], password: IUser['password']): Promise<any> {
    const user = await this.userService.getUserByQuery({
      select: {username: true, password: true, id: true},
      where: {username}
    })
    const chekingPassword = await verifyHash(password, user.password);
    if(user && chekingPassword) {
      return this.login(user)
    }
    return null
  }
}
