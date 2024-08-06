import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { WishesService } from 'src/wishes/wishes.service';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offersRepository: Repository<Offer>,
    readonly wishService: WishesService,
    private readonly dataSource: DataSource,
  ) {}

  async create(currenUser: User, createOfferDto: CreateOfferDto): Promise<any> {
    const { itemId } = createOfferDto;
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
        user: currenUser,
      });

      const offer = await queryRunner.manager.save(createOffer);
      await queryRunner.manager.save(offer);
      currentWish.offers.push(offer);

      await queryRunner.manager.save(currentWish);
      await queryRunner.commitTransaction();
      return offer;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<Offer[]> {
    return await this.offersRepository.find();
  }

  async findOne(offerId: number): Promise<Offer> {
    return await this.offersRepository.findOne({ where: { id: offerId } });
  }
}
