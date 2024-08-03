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

  async findAll(): Promise<Whishlist[]> {
    return this.wishlistRepository.find()
  }

  async findOne(id: number) {
    return this.wishlistRepository.findOneOrFail({where: {id}})
  }

  async update(id: number, updateWhishlistDto: UpdateWhishlistDto) {
    const oldWishlist = await this.findOne(id)
    return await this.wishlistRepository.save({...oldWishlist, ...updateWhishlistDto})
  }

  async remove(id: number): Promise<Whishlist> {
    const removingWishlist = await this.findOne(id)
    return await this.wishlistRepository.remove(removingWishlist)
  }
}
