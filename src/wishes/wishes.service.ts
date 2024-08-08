import { Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { FindManyOptions, In, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish) private readonly wishRepository: Repository<Wish>,
  ) {}

  async create(user: User, createWishDto: CreateWishDto): Promise<Wish> {
    const newWish: Wish = await this.wishRepository.create({
      ...createWishDto,
      owner: user,
    });
    // console.log(newWish)
    return await this.wishRepository.save(newWish);
  }

  async getSortedWishes(setting: 'top' | 'last', limit = 10): Promise<Wish[]> {
    const orderDirection: 'DESC' | 'ASC' = setting === 'top' ? 'DESC' : 'ASC';

    const wishlist = await this.wishRepository.find({
      order: { createdAt: orderDirection },
      take: limit,
      relations: ['owner', 'offers'],
    });
    return wishlist;
  }
  async getUserWish(username: string): Promise<Wish[]> {
    return await this.wishRepository.find({
      where: { owner: { username } },
    });
  }

  async getWishesByUsername(username: string): Promise<Wish[]> {
    const wish = await this.wishRepository.find({
      where: { owner: { username: username } },
      relations: ['owner', 'offers'],
    });
    return wish;
  }

  async getOne(id: number): Promise<Wish> {
    // const test = await this.wishRepository.findOne({ where: { id: itemId } })
    // // console.log(test)
    // const wish = await this.wishRepository.findOneOrFail({ where: { id } });
    const wish = await this.wishRepository.findOneOrFail({
      where: { id },
      relations: ['owner', 'offers'],
    });
    return wish;
  }

  async getAllByArrayIds(wishesId: Array<number>): Promise<Array<Wish>> {
    const wishList = await this.wishRepository.find({
      where: { id: In(wishesId) },
      relations: ['owner', 'offers'],
    });
    return wishList;
  }

  async update(
    id: number,
    updateWishDto: UpdateWishDto,
  ): Promise<UpdateWishDto> {
    const wish = await this.wishRepository.findOneOrFail({ where: { id } });
    const newWish = await this.wishRepository.save({
      ...wish,
      ...updateWishDto,
    });
    const { name, link, image, price, description } = newWish;

    return { name, link, image, price, description };
  }

  // async copy(wishId: number, user: User) {
  //   const wish = await this.getOne(wishId);
  //   const { id, createdAt, updatedAt, offers, owner, raised, copied, ...otherData } = wish;
  //   await this.incrementCopyCount(id);
  //   await this.wishRepository.update(id, { copied: copied + 1 });
  //   await this.create(user, otherData);
  //   return {};
  // }

  async copy(wishId: number, user: User) {
    console.log('------------------------------------');
    const wish = await this.getUpdateWishDto(wishId);
    await this.incrementCopyCount(wishId);

    // await this.wishRepository.update(id, { copied: copied + 1 });
    await this.create(user, wish);
    return {};
  }

  // async copyOne({ wishId, user }) {
  //   const { copied, ...data } = await this.getUpdateWishDto(wishId);
  //   await this.wishRepository.update(wishId, { copied: copied + 1 });
  //   return await this.create(user, data);
  // }

  async incrementCopyCount(id: number | number[]) {
    if (typeof id === 'number') {
      const { copied } = await this.getOne(id);
      await this.wishRepository.update(id, { copied: copied + 1 });
    } else if (Array.isArray(id)) {
      for (const wishId of id) {
        const { copied } = await this.getOne(wishId);
        await this.wishRepository.update(wishId, { copied: copied + 1 });
      }
    }
  }

  async getUpdateWishDto(id: number): Promise<CreateWishDto> {
    const options: FindManyOptions<Wish> = {
      where: {
        id,
      },
      select: ['name', 'link', 'image', 'price', 'description'],
    };
    return await this.wishRepository.findOneOrFail(options);
  }

  async remove(id: number): Promise<Wish> {
    const wish = await this.getOne(id);
    await this.wishRepository.delete(id);
    return wish;
  }
}
