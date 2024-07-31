import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { WishesService } from 'src/wishes/wishes.service';

@Injectable()
export class OffersService {
constructor( 
  @InjectRepository(Offer) 
  private readonly offersRepository: Repository<Offer>,
  // @InjectRepository(User)
  // private readonly userRepository: Repository<User>,
  // readonly usersServis: UsersService,
  // readonly wishesServis: WishesService,
  private readonly dataSource: DataSource,
  ) {}

  async create(user: User, createOfferDto: CreateOfferDto): Promise<Offer> {
    const {username, id, offers } = user
    const {amount, hidden, itemId} = createOfferDto
    // const {offers, ...other} = await this.usersServis.findOneUser({where: {username: username}})

    // const userOffer = await this.offersRepository.create({})
    return await new Offer
  }

  async findAll(): Promise<Offer[]>  {
    return await this.offersRepository.find()
  }

  async findOne(offerId: number): Promise<Offer>  {
    return await this.offersRepository.findOne({where: {id: offerId}})
  }

  // update(id: number, updateOfferDto: UpdateOfferDto) {
  //   return `This action updates a #${id} offer`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} offer`;
  // }
}
