import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { WhishlistsService } from './wishlists.service';
import { CreateWhishlistDto } from './dto/create-wishlist.dto';
import { UpdateWhishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserProfileResponseDto } from 'src/users/dto/user-profile-response.dto';

@ApiTags('wishlist')
@ApiExtraModels(Wishlist)
@Controller('wishlistlists')
export class WhishlistsController {
  constructor(private readonly whishlistsService: WhishlistsService) {}

  @ApiOkResponse({
    type: Wishlist,
    isArray: true,
  })
  @Get()
  findAll(): Promise<Wishlist[]> {
    return this.whishlistsService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    type: Wishlist,
  })
  @Post()
  async create(
    @Body() createWhishlistDto: CreateWhishlistDto,
  ): Promise<Wishlist> {
    return await this.whishlistsService.create(createWhishlistDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: Wishlist })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Wishlist> {
    return this.whishlistsService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: Wishlist })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWhishlistDto: UpdateWhishlistDto,
  ): Promise<Wishlist> {
    return this.whishlistsService.update(+id, updateWhishlistDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: Wishlist })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Wishlist> {
    return this.whishlistsService.remove(+id);
  }
}
