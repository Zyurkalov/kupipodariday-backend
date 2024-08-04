import { Module, forwardRef } from '@nestjs/common';
import { WhishlistsService } from './wishlists.service';
import { WhishlistsController } from './wishlists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { UsersModule } from 'src/users/users.module';
import { WishesModule } from 'src/wishes/wishes.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist]),
  forwardRef(() => UsersModule),
  forwardRef(() => WishesModule),
  forwardRef(()=> AuthModule),
  ],
  controllers: [WhishlistsController],
  providers: [WhishlistsService],
  exports: [WhishlistsService],
})
export class WhishlistsModule {}
