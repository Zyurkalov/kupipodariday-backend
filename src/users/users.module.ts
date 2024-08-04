import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { WishesModule } from 'src/wishes/wishes.module';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  forwardRef(() => WishesModule),
  forwardRef(() => Wishlist),
  forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [UsersService,],
  exports: [UsersService],
})
export class UsersModule { }
