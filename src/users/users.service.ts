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
import { hashValue } from 'src/helpers/hash';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private authService: AuthService,
  ) { }

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
    return await this.usersRepository.findOneOrFail(query);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.usersRepository.find()
  }

  async findOne(name: string): Promise<UserProfileResponseDto> {
    return await this.findOneUser({ where: { username: name } })
  }

  async findUser(query: FindUsersDto['query']) {
    return this.findAllUsers({ where: [{ username: query }, { email: query }] })
  }

  async getUserById(userId: number): Promise<User> {
    return await this.findOneUser({ where: { id: userId } })
  }

  async getUserWishes(name: string): Promise<UserWishesDto[]> {
    return this.findOneUser({ where: { username: name } })['wishes']
  }

  private async handlePasswordUpdate(updateUserDto: UpdateUserDto): Promise<UpdateUserDto> {
    const { password } = updateUserDto;

    if (password) {
      updateUserDto.password = await hashValue(password);
    }
    return updateUserDto;
  }

  async update(user: User, updateUserDto: UpdateUserDto): Promise<UserProfileResponseDto> {
    // const user = await this.getUserById(id);
    const updatedUserDto = await this.handlePasswordUpdate(updateUserDto);

    return this.usersRepository.save({ ...user, ...updatedUserDto });
  }

  async createUser(userData: CreateUserDto): Promise<User> {
    const user = this.findOne(userData.username)
    if (!user) {
      return await this.usersRepository.save({ ...userData });
    }
  }

  async removeUser(userId: number): Promise<{ username: string, id: number, message: string }> {
    const { id, username } = await this.findOneUser({ where: { id: userId } })

    if (!id || !username) {
      throw new Error("пользователь не найден")
    }
    try {
      await this.usersRepository.delete({ id })
      return { id, username, message: "пользователь удален" }
    } catch (err) { throw new Error(`непредвиденная ошибка - ${err.message}`) }

  }

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    const { password } = createUserDto;
    const user = await this.usersRepository.create({
      ...createUserDto,
      password: await hashValue(password)
    })
    return this.usersRepository.save(user)
  }

}
