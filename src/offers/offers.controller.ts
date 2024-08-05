import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { AuthUser } from 'src/common/decorator/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Offer } from './entities/offer.entity';

@ApiTags('offers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @ApiResponse({
    status: 201, 
    type: Object
  })
  @Post()
  create(@AuthUser() user: User, @Body() createOfferDto: CreateOfferDto) {
    return this.offersService.create(user,  createOfferDto);
  }

  @ApiOkResponse({
    type: Offer,
    isArray: true,
  })
  @Get()
  findAll(): Promise<Offer[]> {
    return this.offersService.findAll();
  }

  @ApiOkResponse({
    type: Offer
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Offer> {
    return this.offersService.findOne(+id);
  }

}
