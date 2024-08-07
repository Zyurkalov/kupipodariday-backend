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
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';
import { AuthUser } from 'src/common/decorator/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { WishOwnerGuard } from 'src/wishes/guards/wish-owner.guard';
import { WishNotOwnerGuard } from 'src/wishes/guards/wish-not-owner.guard';

@ApiTags('wishes')
@ApiExtraModels(Wish)
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @ApiResponse({
    status: 201,
    type: Object,
  })
  @Post()
  async create(
    @AuthUser() user: User,
    @Body() createWishDto: CreateWishDto,
  ): Promise<object> {
    await this.wishesService.create(user, createWishDto);
    return {};
  }

  @ApiResponse({
    type: Wish,
    isArray: true,
  })
  @Get('last')
  findLast(): Promise<Wish[]> {
    return this.wishesService.getSortedWishes('last', 40);
  }

  @ApiOkResponse({
    type: Wish,
    isArray: true,
  })
  @Get('top')
  findTop(): Promise<Wish[]> {
    return this.wishesService.getSortedWishes('top');
  }

  @ApiOkResponse({ type: Wish })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Wish> {
    return this.wishesService.getOne(+id);
  }

  @ApiOkResponse({ type: UpdateWishDto })
  // @UseGuards(WishOwnerGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWishDto: UpdateWishDto,
  ): Promise<Wish> {
    return this.wishesService.update(+id, updateWishDto);
  }

  @ApiOkResponse({ type: Wish })
  @UseGuards(WishOwnerGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log(id)
    return this.wishesService.remove(+id);
  }

  @UseGuards(WishNotOwnerGuard)
  @ApiResponse({
    status: 201,
    type: Object,
  })
  @Post(':id/copy')
  copy(@Param('id') id: string, @AuthUser() user: User): Promise<Wish> {
    return this.wishesService.copy(+id, user);
  }
}
