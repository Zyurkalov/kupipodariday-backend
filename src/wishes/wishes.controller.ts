import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';
import { AuthUser } from 'src/common/decorator/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { WishOwnerGuard } from 'src/wishes/guards/wish-owner.guard';
import { WishNotOwnerGuard } from 'src/wishes/guards/wish-not-owner.guard';

// не забыть добавить перехватчик ошибок для неавторизованных пользователей
@ApiTags('wishes')
@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({type: Wish})
  @Post()
  create(@AuthUser() user: User, @Body() createWishDto: CreateWishDto): Promise<Wish> {
    return this.wishesService.create(user, createWishDto);
  }

  @ApiOkResponse({ type: Array<Wish> })
  @Get('last')
  findLast(): Promise<Wish[]> {
    return this.wishesService.getSortedWishes('last');
  }

  @ApiOkResponse({ type: Array<Wish> })
  @Get('top')
  findTop(): Promise<Wish[]> {
    return this.wishesService.getSortedWishes('top');
  }

  @ApiOkResponse({ type: Wish })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Wish> {
    return this.wishesService.getOne(+id);
  }

  @ApiOkResponse({ type: Wish })
  @UseGuards(JwtAuthGuard, WishOwnerGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWishDto: UpdateWishDto): Promise<Wish> {
    return this.wishesService.update(+id, updateWishDto);
  }

  @ApiOkResponse({})
  @UseGuards(JwtAuthGuard, WishOwnerGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wishesService.remove(+id);
  }

  @UseGuards(JwtAuthGuard, WishNotOwnerGuard)
  @ApiOkResponse({ type: Wish })
  @Post(':id/copy')
  copy(@Param('id') id: string, @AuthUser() user: User): Promise<Wish> {
    return this.wishesService.copy(+id, user);
  }
}
