import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';

@ApiTags('wishes')
@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Post()
  // create(@Body() createWishDto: CreateWishDto) {
  //   return this.wishesService.create(createWishDto);
  // }

  @Get('last')
  findAll() {
    return this.wishesService.findAll();
  }

  @Get('top')
  // findAll() {
  //   return this.wishesService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wishesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWishDto: UpdateWishDto) {
    return this.wishesService.update(+id, updateWishDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wishesService.remove(+id);
  }

  @Post(':id/copy')
  create(@Param('id') createWishDto: CreateWishDto) {
    return this.wishesService.create(createWishDto);
  }
}
