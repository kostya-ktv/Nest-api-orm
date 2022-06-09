
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDTO } from './dto/add-role.dto';
import { BanUserDTO } from './dto/ban-user.dto';
import { UserDTO } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
   constructor(
      @InjectModel(User) 
      private userRepo: typeof User,
      private roleService: RolesService
      ){}

   async createUser(userDTO: UserDTO) {
      const user = await this.userRepo.create(userDTO)
      const role = await this.roleService.getRoleByValue("USER")
      await user.$set('roles', [role.id])
      user.roles = [...user.roles, role]
      return user
   }

   async getAllUsers() {
      const users = await this.userRepo.findAll({
         include: {
            all: true
         }
      })

      return users
   }

   async getUserByEmail(email: string) {
      const user = this.userRepo.findOne({
               where: {email},
               include: {all: true}
            })
         return user
      }

   async addRole(addRoleDto: AddRoleDTO){
      const user = await this.userRepo.findByPk(addRoleDto.userID)
      const role = await this.roleService.getRoleByValue(addRoleDto.value)
      if(role && user) {
         await user.$add('role', role.id)
         return addRoleDto
      }
      throw new HttpException('user or role not found', HttpStatus.NOT_FOUND)
   }

   async userBan(banUserDto: BanUserDTO){
      const user = await this.userRepo.findByPk(banUserDto.userID)
      if(!user) {
         throw new HttpException('user not found', HttpStatus.NOT_FOUND)
      }
      user.banned = true
      user.banReason = banUserDto.banReason
      await user.save()
      return user
   }
}
