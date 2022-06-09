import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDTO } from 'src/Users/dto/create-user.dto';
import { UsersService } from 'src/Users/users.service';
import {JwtService} from '@nestjs/jwt'
import BcryptJS from 'bcryptjs'
import { User } from 'src/Users/users.model';

@Injectable()
export class AuthService {
   constructor(
      private userService: UsersService,
      private jwtService: JwtService
      ){}

   async login(userDTO: UserDTO){
      const user = await this.validateUser(userDTO)
      return this.generateToken(user)
   }


   async registration(userDTO: UserDTO){
      const candidate = await this.userService.getUserByEmail(userDTO.email)
      if(candidate) {
         throw new HttpException('user not found', HttpStatus.BAD_REQUEST)
      }
      const hashPassword = await BcryptJS.hash(userDTO.password, 5);
      const user = await this.userService.createUser({
         email: userDTO.email,
         password: hashPassword
      })
      return this.generateToken(user)
   }

   private generateToken(user: User) {
      const payload = {
         email: user.email,
         id: user.id,
         roles: user.roles
      }
      return {
         token: this.jwtService.sign(payload)
      }
   }

   private async validateUser(userDTO: UserDTO) {
      const user = await this.userService.getUserByEmail(userDTO.email)
      const passwordCompare = await BcryptJS.compare(userDTO.password, user.password)
      if(user && passwordCompare) {
         return user
      } else {
         throw new UnauthorizedException({message: 'Invalid email'})
      }
   }
}
