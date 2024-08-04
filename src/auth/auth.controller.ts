import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthUser } from 'src/common/decorator/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserAlreadyExist } from './guards/user-already-exist.guard';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async login(@AuthUser() user: User, @Body() createAuthDto: CreateUserDto) {
    return await this.authService.login(user);
  }
  
  @UseGuards(UserAlreadyExist)
  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.signUp(createUserDto)
    return user
  }

}
