import { OmitType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class UserPublicProfileResponseDto extends OmitType(User, [
  'password',
  'wishes',
  'wishlists',
  'offers',
  'email',
] as const) {}
