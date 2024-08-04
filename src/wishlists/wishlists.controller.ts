import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { WhishlistsService } from './wishlists.service';
import { CreateWhishlistDto } from './dto/create-wishlist.dto';
import { UpdateWhishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('wishlist')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('wishlistlists')
export class WhishlistsController {
  constructor(private readonly whishlistsService: WhishlistsService) {}

  @ApiOkResponse({type: Promise<Wishlist[]>})
  @Get()
  findAll(): Promise<Wishlist[]> {
    return this.whishlistsService.findAll();
  }

  @ApiOkResponse({type: Promise<Wishlist>})
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createWhishlistDto: CreateWhishlistDto): Promise<Wishlist> {
    return await this.whishlistsService.create(createWhishlistDto);
  }

  @ApiOkResponse({type: Promise<Wishlist>})
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Wishlist> {
    return this.whishlistsService.findOne(+id);
  }

  @ApiOkResponse({type: Promise<Wishlist>})
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWhishlistDto: UpdateWhishlistDto): Promise<Wishlist> {
    return this.whishlistsService.update(+id, updateWhishlistDto);
  }

  @ApiOkResponse({type: Promise<Wishlist>})
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Wishlist> {
    return this.whishlistsService.remove(+id);
  }
}
