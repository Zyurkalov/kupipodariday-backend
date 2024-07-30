import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { UpdateUserDto } from 'src/auth/dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { UserProfileResponseDto } from './dto/user-profile-response.dto';
import { instanceToPlain } from 'class-transformer';
import { UserWishesDto } from './dto/user-wihes.dto';
import { FindUsersDto } from './dto/find-user.dto';
import { Wish } from 'src/wishes/entities/wish.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}


  async getMe(user: User): Promise<UserProfileResponseDto> {
    return <UserProfileResponseDto>instanceToPlain(user);
    // instanceToPlain(user) - преобразует user, в нашем случае экземпляр User - в объект
    // <UserProfileResponseDto> указывает, какие типы должны быть извлечены из instanceToPlain(user)
  }
  async getMyWish(user: User): Promise<Array<Wish>> {
    return user.wishes;
  }

  async findAllUsers(query: FindManyOptions<User>): Promise<Array<User>> {
    return await this.usersRepository.find(query);
  }

  async findOneUser(query: FindManyOptions<User>): Promise<User> {
    return await this.usersRepository.findOne(query);
  }

  async findOne(name: string): Promise<UserProfileResponseDto> {
    return await this.findOneUser({where: {username: name}})
  }

  async getUserWishes (name: string): Promise<Array<UserWishesDto>> {
    return this.findOneUser({where: {username: name}})['wishes']
  }

  async update(user: User, updateUserDto: UpdateUserDto): Promise<UserProfileResponseDto> {
    if(!user) {
      throw new Error('пользователь не авторизован')
    }
    if(updateUserDto.password) {
      // updateUserDto.password = await hashValue(updateUserDto.password)
    }
    const updatedUser = await this.usersRepository.save(Object.assign(user, updateUserDto))
    return <UserProfileResponseDto>instanceToPlain(user);
  }



  async findUsers(query: FindUsersDto['query']) {
    return this.findAllUsers({where: [{username: query}, {email: query}]})
  }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
