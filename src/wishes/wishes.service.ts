import { Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class WishesService {
  constructor(@InjectRepository(Wish) private readonly wishRepository: Repository<Wish>) { }

  async create(user: User, createWishDto: CreateWishDto): Promise<Wish> {
    const newWish = await this.wishRepository.create({ ...createWishDto, owner: user })
    return await this.wishRepository.save(newWish)
  }

  async getSortedWishes(setting: 'top' | "last", limit: number = 10) {
    const orderDirection: 'DESC' | 'ASC' = setting === 'top' ? 'DESC' : 'ASC';

    return await this.wishRepository.find({
      order: { createdAt: orderDirection },
      take: limit,
    });
  }

  async getOne(id: number) {
    return await this.wishRepository.findOneOrFail({ where: { id } })
  }

  async update(id: number, updateWishDto: UpdateWishDto) {
    const wish = await this.getOne(id)
      return await this.wishRepository.save({ ...wish, ...updateWishDto })
  }

  async copy(id: number, user: User) {
    const { copied, ...data } = await this.getOne(id)
    await this.wishRepository.update(id, { ...data, copied: copied+1 })
    return await this.create(user , data);
  }

  async remove(id: number) {
    await this.getOne(id)
    await this.wishRepository.delete(id)
  }
}
