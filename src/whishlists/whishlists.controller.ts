import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WhishlistsService } from './whishlists.service';
import { CreateWhishlistDto } from './dto/create-whishlist.dto';
import { UpdateWhishlistDto } from './dto/update-whishlist.dto';
import { Whishlist } from './entities/whishlist.entity';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('wishlist')
@Controller('wishlistlists')
export class WhishlistsController {
  constructor(private readonly whishlistsService: WhishlistsService) {}

  @Get()
  findAll(): Promise<Whishlist[]> {
    return this.whishlistsService.findAll();
  }

  @Post()
  async create(@Body() createWhishlistDto: CreateWhishlistDto): Promise<Whishlist> {
    return await this.whishlistsService.create(createWhishlistDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Whishlist> {
    return this.whishlistsService.findOne(+id);
  }
//@guard на право доступа к wishlist
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWhishlistDto: UpdateWhishlistDto) {
    return this.whishlistsService.update(+id, updateWhishlistDto);
  }

  //@guard на право доступа к wishlist
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Whishlist> {
    return this.whishlistsService.remove(+id);
  }
}
