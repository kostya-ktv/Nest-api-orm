import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";
import { User } from "src/Users/users.model";

interface PostCreationAttr {
   title: string
   content: string
   userID: number
   image: string
}

@Table({tableName: 'users'})
export class Post extends Model<Post, PostCreationAttr> {

   @Column({
      type: DataType.INTEGER,
      unique: true,
      autoIncrement: true,
      primaryKey: true
   })
   id: number

   @ForeignKey(() => User)
   @Column({
      type: DataType.INTEGER
   })
   userID: number

   @Column({
      type: DataType.STRING,
      allowNull: false
   })
   title: string

   @Column({
      type: DataType.STRING,
      allowNull: false
   })
   content: string

   @Column({
      type: DataType.STRING,
   })
   image: string

   @BelongsTo(() => User)
   author: User



}