import { PickType, IntersectionType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { BaseEntityForIdAndDate } from 'src/constants/entity/base.entity';

export class UserProfileResponseDto extends IntersectionType(
    PickType(User, ['username', 'about', 'avatar', 'email'] as const),
    BaseEntityForIdAndDate
    ) {}