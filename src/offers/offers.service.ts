import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { WishesService } from 'src/wishes/wishes.service';
import { Wish } from 'src/wishes/entities/wish.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offersRepository: Repository<Offer>,
    readonly wishService: WishesService,
    private readonly dataSource: DataSource,
  ) { }

  async create(user: User, createOfferDto: CreateOfferDto): Promise<any> {
    const { amount, hidden, itemId } = createOfferDto;
    const currentWish = await this.wishService.getOne(itemId);
    
    // Проверка текущего желания
    // if (!currentWish) {
    //     throw new Error('Wish not found');
    // }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        const createOffer: Offer = this.offersRepository.create({
            ...createOfferDto,
            item: currentWish,
            user: user,
        });

        await queryRunner.manager.save(currentWish);
        await queryRunner.commitTransaction();
        return createOffer;

    } catch (error) {
        await queryRunner.rollbackTransaction();
    } finally {
        await queryRunner.release();
    }
}

  async findAll(): Promise<Offer[]> {
    return await this.offersRepository.find()
  }

  async findOne(offerId: number): Promise<Offer> {
    return await this.offersRepository.findOne({ where: { id: offerId } })
  }

}
