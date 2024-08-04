import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtConfigFactory } from 'src/config/jwt-config.factory';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      useClass: JwtConfigFactory,
    }),
//   JwtModule.register({
//     secret: process.env.JWT_SECRET || 'default_secret',
//     signOptions: { expiresIn: '60s' },
// })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtConfigFactory],
  exports: [AuthService]
})
export class AuthModule {}
