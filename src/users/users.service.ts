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
  async getMyWish(user: User): Promise<Wish[]> {
    return await user.wishes;
  }

  async findAllUsers(query: FindManyOptions<User>): Promise<User[]> {
    return await this.usersRepository.find(query);
  }

  async findOneUser(query: FindManyOptions<User>): Promise<User> {
    return await this.usersRepository.findOne(query);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.usersRepository.find()
  }

  async findOne(name: string): Promise<UserProfileResponseDto> {
    return await this.findOneUser({where: {username: name}})
  }

  async findUser(query: FindUsersDto['query']) {
    return this.findAllUsers({where: [{username: query}, {email: query}]})
  }

  async getUserWishes (name: string): Promise<UserWishesDto[]> {
    return this.findOneUser({where: {username: name}})['wishes']
  }

  async update(user: User, updateUserDto: UpdateUserDto): Promise<UserProfileResponseDto> {
    if(!user) {
      throw new Error('пользователь не авторизован')
    }
    // if(updateUserDto.password) {
    //   // updateUserDto.password = await hashValue(updateUserDto.password)
    // }
    
    try {
      // await this.usersRepository.update({ id: user.id }, { ...updateUserDto });
      // const updatedUser = await this.findOne(user.username);
      const savedUser = await this.usersRepository.save(Object.assign(user, updateUserDto));

      if (!savedUser) {
          throw new Error("Пользователь не найден");
      }
      return instanceToPlain(savedUser) as UserProfileResponseDto;
    } catch(err) {
          throw new Error(`ошибка при обновлении пользователя - ${err.message}`);
    }
  }

  async createUser(userData: CreateUserDto): Promise<User> {
    const user = this.findOne(userData.username)
    if (!user) {
      return await this.usersRepository.save({...userData});
    }
  }

  async removeUser(userId: number): Promise<{username: string, id: number, message: string}> {
    const {id, username} = await this.findOneUser({where: {id: userId}})

    if(!id || !username) {
      throw new Error("пользователь не найден")
    }
    try {
      await this.usersRepository.delete({id})
      return { id, username, message: "пользователь удален" }
    } catch(err) { throw new Error(`непредвиденная ошибка - ${err.message}`) }

  }
}
