import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { WishesModule } from './wishes/wishes.module';
import { OffersModule } from './offers/offers.module';
import { WhishlistsModule } from './whishlists/whishlists.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, WishesModule, OffersModule, WhishlistsModule, AuthModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
