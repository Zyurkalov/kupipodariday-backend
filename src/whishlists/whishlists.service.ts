import { Injectable } from '@nestjs/common';
import { CreateWhishlistDto } from './dto/create-whishlist.dto';
import { UpdateWhishlistDto } from './dto/update-whishlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Whishlist } from './entities/whishlist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WhishlistsService {
  constructor(@InjectRepository(Whishlist) private readonly wishlistRepository: Repository<Whishlist> ) {}

  async create(createWhishlistDto: CreateWhishlistDto) {
    const newWishlist =  await this.wishlistRepository.create(createWhishlistDto)
    return await this.wishlistRepository.save(newWishlist)
  }

  findAll() {
    return `This action returns all whishlists`;
  }

  findOne(id: number) {
    return `This action returns a #${id} whishlist`;
  }

  update(id: number, updateWhishlistDto: UpdateWhishlistDto) {
    return `This action updates a #${id} whishlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} whishlist`;
  }
}
