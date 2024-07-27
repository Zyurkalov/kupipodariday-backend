import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { FindUsersDto } from './dto/find-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  findAll() {
    return this.usersService.findAll();
  }

  @Patch('me')
  update(@Param('id') id: string, @Body() updateUserDto: FindUsersDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Get('me/wishes')


  @Get(':username')


  @Get(':username/wishes')


  @Post('find')


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
