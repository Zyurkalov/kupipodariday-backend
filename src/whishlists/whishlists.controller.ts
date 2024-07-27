import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WhishlistsService } from './whishlists.service';
import { CreateWhishlistDto } from './dto/create-whishlist.dto';
import { UpdateWhishlistDto } from './dto/update-whishlist.dto';

@Controller('wishlistlists')
export class WhishlistsController {
  constructor(private readonly whishlistsService: WhishlistsService) {}

  @Get()
  findAll() {
    return this.whishlistsService.findAll();
  }

  @Post()
  create(@Body() createWhishlistDto: CreateWhishlistDto) {
    return this.whishlistsService.create(createWhishlistDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.whishlistsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWhishlistDto: UpdateWhishlistDto) {
    return this.whishlistsService.update(+id, updateWhishlistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.whishlistsService.remove(+id);
  }
}
