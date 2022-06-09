import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "src/Users/users.model";
import { UserRoles } from "./user-roles.model";
interface RoleCreationAttr {
   value: string
   description: string
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttr> {

   @ApiProperty({example: '1', description: 'ID'})
   @Column({
      type: DataType.INTEGER,
      unique: true,
      autoIncrement: true,
      primaryKey: true
   })
   id: number

   @ApiProperty({example: 'Admin', description: 'admin roles'})
   @Column({
      type: DataType.STRING,
      unique: true,
      allowNull: false
   })
   value: string

   @ApiProperty({example: 'about a role', description: 'roles description'})
   @Column({
      type: DataType.STRING,
      unique: true,
      allowNull: false
   })
   description: string

   @BelongsToMany(() => User, () => UserRoles)
   users: User[]

}