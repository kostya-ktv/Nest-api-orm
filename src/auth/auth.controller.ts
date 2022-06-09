import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDTO } from 'src/Users/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
   constructor(private authService: AuthService){}

   @Post('/login')
   login(@Body() userDTO: UserDTO){
      return this.authService.login(userDTO)
   }

   @Post('/registration')
   registration(@Body() userDTO: UserDTO){
      return this.authService.registration(userDTO)
   }
}
