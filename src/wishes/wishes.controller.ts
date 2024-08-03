import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';
import { AuthUser } from 'src/common/decorator/user.decorator';
import { User } from 'src/users/entities/user.entity';

// не забыть добавить перехватчик ошибок для неавторизованных пользователей
@ApiTags('wishes')
@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @ApiOkResponse({type: Wish})
  @Post()
  create(@AuthUser() user: User, @Body() createWishDto: CreateWishDto): Promise<Wish> {
    return this.wishesService.create(user, createWishDto);
  }

  @Get('last')
  findLast() {
    return this.wishesService.getSortedWishes('last');
  }

  @Get('top')
  findTop() {
    return this.wishesService.getSortedWishes('top');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wishesService.getOne(+id);
  }

  //@Gard стоит добавить для проверки доступа к wish
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWishDto: UpdateWishDto) {
    return this.wishesService.update(+id, updateWishDto);
  }
 //@Gard стоит добавить для проверки доступа к wish
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wishesService.remove(+id);
  }
 //@Gard проверить отсутствие данного wish у пользователя
  @Post(':id/copy')
  copy(@Param('id') id: string, @AuthUser() user: User) {
    return this.wishesService.copy(+id, user);
  }
}
