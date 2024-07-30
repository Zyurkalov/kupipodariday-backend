import { Module, forwardRef } from '@nestjs/common';
import { WishesService } from './wishes.service';
import { WishesController } from './wishes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { UsersModule } from 'src/users/users.module';
import { WhishlistsModule } from 'src/whishlists/whishlists.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Wish]),
  forwardRef(() => UsersModule),
  forwardRef(() => WhishlistsModule),
  forwardRef(() => AuthModule),
  ],
  controllers: [WishesController],
  providers: [WishesService]
})
export class WishesModule { }
