import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoleDTO } from './dto/role.dto';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
   constructor(@InjectModel(Role) private roleRepo: typeof Role){}

   async createRole(roleDTO: RoleDTO) {
      await this.roleRepo.create(roleDTO)
   }
   async getRoleByValue(value: string) {
      const role = await this.roleRepo.findOne({where: {value}})
      return role
   }
}
