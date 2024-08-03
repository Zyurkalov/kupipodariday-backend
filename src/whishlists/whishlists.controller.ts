import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { WhishlistsService } from './whishlists.service';
import { CreateWhishlistDto } from './dto/create-whishlist.dto';
import { UpdateWhishlistDto } from './dto/update-whishlist.dto';
import { Whishlist } from './entities/whishlist.entity';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('wishlist')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('wishlistlists')
export class WhishlistsController {
  constructor(private readonly whishlistsService: WhishlistsService) {}

  @ApiOkResponse({type: Promise<Whishlist[]>})
  @Get()
  findAll(): Promise<Whishlist[]> {
    return this.whishlistsService.findAll();
  }

  @ApiOkResponse({type: Promise<Whishlist>})
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createWhishlistDto: CreateWhishlistDto): Promise<Whishlist> {
    return await this.whishlistsService.create(createWhishlistDto);
  }

  @ApiOkResponse({type: Promise<Whishlist>})
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Whishlist> {
    return this.whishlistsService.findOne(+id);
  }

  @ApiOkResponse({type: Promise<Whishlist>})
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWhishlistDto: UpdateWhishlistDto): Promise<Whishlist> {
    return this.whishlistsService.update(+id, updateWhishlistDto);
  }

  @ApiOkResponse({type: Promise<Whishlist>})
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Whishlist> {
    return this.whishlistsService.remove(+id);
  }
}
