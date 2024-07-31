import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { WishesModule } from './wishes/wishes.module';
import { OffersModule } from './offers/offers.module';
import { WhishlistsModule } from './whishlists/whishlists.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configForAppModule from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigFactory } from './config/database-config.factory';
import configuration from './config/configuration';

//сдесь остались старые настройки
// оствил на случай если что то сломается
@Module({
  imports: [
    // ConfigModule.forRoot({isGlobal: true, envFilePath: '../.env'}),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (config: ConfigService) => ({
    //     type: config.get<string>('TYPE') as 'postgres' |'mysql',
    //     host: config.get<string>('DB_HOST'),
    //     port: config.get<number>('DB_PORT'),
    //     username: config.get<string>('DB_USERNAME'),
    //     password: config.get<string>('DB_PASSWORD'),
    //     database: config.get<string>('DB_DATABASE'),
    //     entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //     synchronize: false,
    //   })
    // }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigFactory
    }),
    UsersModule,
    WishesModule,
    WhishlistsModule,
    OffersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers:[],
})
export class AppModule {}
