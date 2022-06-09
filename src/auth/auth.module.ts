import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from 'src/Users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {JwtModule} from '@nestjs/jwt'
@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef (() => UsersModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY,
      signOptions: {
        expiresIn: '24h'
      }
    })
  ],
  exports: [
    AuthService,
    JwtModule
  ]
})
export class AuthModule {}
