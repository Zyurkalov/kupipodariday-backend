import { OmitType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { UserProfileResponseDto } from './user-profile-response.dto';

export class UserPublicProfileResponseDto extends OmitType(UserProfileResponseDto, ['email'] as const) {}
