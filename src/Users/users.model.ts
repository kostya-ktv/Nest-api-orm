
import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Post } from "src/posts/post.model";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

interface UserCreationAttr {
   email: string
   password: string
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttr> {
   @ApiProperty({example: '1', description: 'ID'})
   @Column({
      type: DataType.INTEGER,
      unique: true,
      autoIncrement: true,
      primaryKey: true
   })
   id: number

   @ApiProperty({example: 'some@mail.com', description: 'email'})
   @Column({
      type: DataType.STRING,
      unique: true,
      allowNull: false
   })
   email: string

   @ApiProperty({example: '123456', description: 'Password'})
   @Column({
      type: DataType.STRING,
      allowNull: false
   })
   password: string

   @ApiProperty({example: 'true', description: 'isBanned'})
   @Column({
      type: DataType.BOOLEAN,
      defaultValue: false
   })
   banned: boolean

   @ApiProperty({example: 'Spam', description: 'Spam actions'})
   @Column({
      type: DataType.STRING,
      allowNull: true
   })
   banReason: string

   @BelongsToMany(() => User, () => UserRoles)
   roles: Role[]

   @HasMany(() => Post)
   posts: Post[]
}