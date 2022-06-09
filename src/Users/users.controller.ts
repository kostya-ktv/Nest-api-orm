import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from 'src/Guards/jwt-auth.guard';
import { Roles } from 'src/Guards/roles-auth.decorator';
import { RolesGuard } from 'src/Guards/roles.guard';
import { ValidationPipe } from 'src/Pipes/validation.pipe';
import { AddRoleDTO } from './dto/add-role.dto';
import { BanUserDTO } from './dto/ban-user.dto';
import { UserDTO } from './dto/create-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
   constructor(
      private userService: UsersService
   ) {}

   @ApiOperation({summary: 'User Creation'})
   @ApiResponse({status: 200, type: User})
   @UsePipes(ValidationPipe)
   @Post()
   create(@Body() userDTO: UserDTO) {
      return this.userService.createUser(userDTO)
   }


   @ApiOperation({summary: 'Get all users'})
   @ApiResponse({status: 200, type: [User]})
   @UseGuards(JWTAuthGuard)
   @Roles("ADMIN")
   @UseGuards(RolesGuard)
   @Get()
   getAll() {
      return this.userService.getAllUsers()
   }

   @ApiOperation({summary: 'Get role'})
   @ApiResponse({status: 200})
   @UseGuards(JWTAuthGuard)
   @Roles("ADMIN")
   @UseGuards(RolesGuard)
   @Post('add-role')
   addRole(@Body() addRoleDto: AddRoleDTO) {
      return this.userService.addRole(addRoleDto)
   }

   @ApiOperation({summary: 'Ban user'})
   @ApiResponse({status: 200})
   @UseGuards(JWTAuthGuard)
   @Roles("ADMIN")
   @UseGuards(RolesGuard)
   @Get('ban')
   ban(@Body() banUserDto: BanUserDTO) {
      return this.userService.userBan(banUserDto)
   }
}
