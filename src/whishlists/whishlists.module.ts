import { Module, forwardRef } from '@nestjs/common';
import { WhishlistsService } from './whishlists.service';
import { WhishlistsController } from './whishlists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Whishlist } from './entities/whishlist.entity';
import { UsersModule } from 'src/users/users.module';
import { WishesModule } from 'src/wishes/wishes.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Whishlist]),
  forwardRef(() => UsersModule),
  forwardRef(() => WishesModule),
  forwardRef(()=> AuthModule),
  ],
  controllers: [WhishlistsController],
  providers: [WhishlistsService]
})
export class WhishlistsModule {}
