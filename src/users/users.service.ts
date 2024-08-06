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
import { hashValue } from 'src/common/helpers/hash';
import { AuthService } from 'src/auth/auth.service';
import { SignupUserResponseDto } from 'src/auth/dto/signup-user-response.dto';
import { WishesService } from 'src/wishes/wishes.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private authService: AuthService,
    private wishSevice: WishesService,
  ) { }

  async getAllUsers(): Promise<User[]> {
    return await this.usersRepository.find()
  }

  getMe(user: User): UserProfileResponseDto {
    const currentUser = <UserProfileResponseDto>instanceToPlain(user);
    return currentUser;
    // instanceToPlain(user) - преобразует user, в нашем случае экземпляр User - в объект
    // <UserProfileResponseDto> указывает, какие типы должны быть извлечены из instanceToPlain(user)
  }
  async getMyWish(user: User): Promise<Wish[]> {
    // console.log(await this.findAllByQuery({ where: { username: user.username } }))
    // return await this.findAllByQuery({ where: { username: user.username } })['wishes']
    return await this.wishSevice.getUserWish(user.username)
  }

  async findAllByQuery(query: FindManyOptions<User>): Promise<User[]> {
    return await this.usersRepository.find(query);
  }

  async getUserByQuery(query: FindManyOptions<User>): Promise<User> {
    return await this.usersRepository.findOneOrFail(query);
  }

  async findOne(name: string): Promise<UserProfileResponseDto> {
    return await this.getUserByQuery({ where: { username: name } })
  }

  async findOneByQuery(name: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { username: name } })
  }

  async getUserById(userId: number): Promise<User> {
    return await this.getUserByQuery({ where: { id: userId } })
  }

  async findUserWishes(name: string): Promise<UserWishesDto[]> {
    return await this.findAllByQuery({ where: { username: name } })['wishes']
  }

  async getUserByBody(query: string) {
    return await this.usersRepository.findOneOrFail({ where: [{ username: query }, { email: query}] })
  }

  // для поиска внутри гардов, вызывать ошибку "OrFail" не нужно
  async findUserByBody(name: string, mail: string) {
    return await this.usersRepository.findOne({ where: [{ username: name }, { email: mail}] })
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

    return await this.usersRepository.save({ ...user, ...updatedUserDto });
  }

  async createUser(userData: CreateUserDto): Promise<User> {
    const user = await this.findOne(userData.username)
    if (!user) {
      return await this.usersRepository.save({ ...userData });
    }
  }

  async removeUser(userId: number): Promise<{ username: string, id: number, message: string }> {
    const { id, username } = await this.getUserByQuery({ where: { id: userId } })

    if (!id || !username) {
      throw new Error("пользователь не найден")
    }
    try {
      await this.usersRepository.delete({ id })
      return { id, username, message: "пользователь удален" }
    } catch (err) { 
      throw new Error(`непредвиденная ошибка - ${err.message}`) 
    }
  }

  async registration(createUserDto: CreateUserDto): Promise<SignupUserResponseDto> {
    const { password, ...userData } = createUserDto;
    const hash = await hashValue(password);
    const createUser = this.usersRepository.create({
      ...userData,
      password: hash,
    });
    const newUser = await this.usersRepository.save(createUser);
    return <SignupUserResponseDto>instanceToPlain(newUser);
  }
}
