import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { FindUsersDto } from './dto/find-user.dto';
import { UpdateUserDto } from 'src/auth/dto/update-user.dto';
import { UserProfileResponseDto } from './dto/user-profile-response.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  findOwn(@Req() req) {
    return this.usersService.findOne(123);
  }

  // @Patch('me')
  // async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }
  @Patch('me')
  async update(@Req() req, @Body() updateUserDto: UpdateUserDto): Promise<any> {
    const {password, ...userData} = await this.usersService.update(
      req.user,
      updateUserDto
    )
    // return this.usersService.update(userData, updateUserDto);
    return 'user'
  }

  @Get('me/wishes')


  @Get(':username')


  @Get(':username/wishes')


  @Post('find')
  hello() {
    return 'hello'
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
