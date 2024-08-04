import { Injectable } from '@nestjs/common';
import { CreateWhishlistDto } from './dto/create-wishlist.dto';
import { UpdateWhishlistDto } from './dto/update-wishlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WhishlistsService {
  constructor(@InjectRepository(Wishlist) private readonly wishlistRepository: Repository<Wishlist> ) {}

  async create(createWhishlistDto: CreateWhishlistDto) {
    const newWishlist =  await this.wishlistRepository.create(createWhishlistDto)
    return await this.wishlistRepository.save(newWishlist)
  }

  async findAll(): Promise<Wishlist[]> {
    return this.wishlistRepository.find()
  }

  async findOne(id: number) {
    return this.wishlistRepository.findOneOrFail({where: {id}})
  }

  async update(id: number, updateWhishlistDto: UpdateWhishlistDto) {
    const oldWishlist = await this.findOne(id)
    return await this.wishlistRepository.save({...oldWishlist, ...updateWhishlistDto})
  }

  async remove(id: number): Promise<Wishlist> {
    const removingWishlist = await this.findOne(id)
    return await this.wishlistRepository.remove(removingWishlist)
  }
}
