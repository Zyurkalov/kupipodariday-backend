import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { FindUsersDto } from './dto/find-user.dto';
import { UpdateUserDto } from 'src/auth/dto/update-user.dto';
import { UserProfileResponseDto } from './dto/user-profile-response.dto';
import { UserPublicProfileResponseDto } from './dto/user-public-profile-response.dto';
import { UserWishesDto } from './dto/user-wihes.dto';
import { AuthUser } from 'src/common/decorator/user.decorator';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { DEFAULT_ERRORS } from 'src/constants/constants';
import { Wish } from 'src/wishes/entities/wish.entity';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiOkResponse({ type: UserProfileResponseDto })
  @Get('me')
  async findMe(@AuthUser() user: User): Promise<UserProfileResponseDto> {
    return await this.usersService.getMe(user);
  }

  @ApiOkResponse({ 
    type: UserProfileResponseDto 
  })
  @ApiResponse({
    status: DEFAULT_ERRORS.validationError.statusCode, 
    description: DEFAULT_ERRORS.validationError.message})
  @Patch('me')
  async update(@AuthUser() user: User, @Body() updateUserDto: UpdateUserDto): Promise<UserProfileResponseDto> {
    return this.usersService.update(user, updateUserDto);
  }

  @ApiOkResponse({ 
    type: Wish, 
    isArray: true,
  })
  @Get('me/wishes')
  async findMyWish(@AuthUser() user: User): Promise<Wish[]> {
    return await this.usersService.getMyWish(user);
  }

  @ApiOkResponse({ type: UserPublicProfileResponseDto })
  @Get(':username')
  async findUser(@Param('username') userName: string): Promise<UserPublicProfileResponseDto> {
    return this.usersService.findOne(userName)
  }

  @ApiOkResponse({ 
    type: UserWishesDto,
    isArray: true,
  })
  @Get(':username/wishes')
  async getWishes(@Param('username') userName: string): Promise<Array<UserWishesDto>> {
    return this.usersService.getUserWishes(userName)
  }

  @ApiResponse({ 
    status: 201,
    type: UserProfileResponseDto,
    isArray: true,
  })
  @Post('find')
  async findUserByBody(@Body() body: FindUsersDto): Promise<UserProfileResponseDto > {
    return this.usersService.getUserByBody(body.query)
  }
  
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
