import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { FindUsersDto } from './dto/find-user.dto';
import { UpdateUserDto } from 'src/auth/dto/update-user.dto';
import { UserProfileResponseDto } from './dto/user-profile-response.dto';
import { UserPublicProfileResponseDto } from './dto/user-public-profile-response.dto';
import { UserWishesDto } from './dto/user-wihes.dto';
import { CurrentUser } from 'src/utility/currentUser';
import { User } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiOkResponse({ type: UserProfileResponseDto })
  @Get('me')
  async findMe(@CurrentUser() user: User): Promise<UserProfileResponseDto> {
    return await this.usersService.getMe(user);
  }

  @ApiOkResponse({ type: UserProfileResponseDto })
  @Patch('me')
  async update(@CurrentUser() user: User, @Body() updateUserDto: UpdateUserDto): Promise<UserProfileResponseDto> {
    return this.usersService.update(user, updateUserDto);
  }

  @ApiOkResponse({ type: UserWishesDto })
  @Get('me/wishes')
  async findMyWish(@CurrentUser() user: User): Promise<UserWishesDto[]> {
    return await this.usersService.getMyWish(user);
  }

  @ApiOkResponse({ type: UserPublicProfileResponseDto })
  @Get(':username')
  async findOne(@Param('username') userName: string): Promise<UserPublicProfileResponseDto> {
    return this.usersService.findOne(userName)
  }

  @ApiOkResponse({ type: UserWishesDto })
  @Get(':username/wishes')
  async getWishes(@Param('username') userName: string): Promise<Array<UserWishesDto>> {
    return this.usersService.getUserWishes(userName)
  }

  @ApiOkResponse({ type: FindUsersDto })
  @Post('find')
  findUsers(@Body() body: FindUsersDto) {
    return this.usersService.findUsers(body.query)
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
