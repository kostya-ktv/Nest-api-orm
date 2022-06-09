import { ApiProperty } from "@nestjs/swagger"
import {IsString, Length, IsEmail} from 'class-validator'
export class UserDTO {

   @ApiProperty({example: 'some@mail.com', description: 'email'})
   @IsString({message: 'Need to be a string'})
   @IsEmail({}, {message: 'Invalaid email'})
   readonly email: string

   @ApiProperty({example: '1213456', description: 'password'})
   @IsString({message: 'Need to be a string'})
   @Length(4, 15, {message: 'Not less 4 symbols'})
   readonly password: string
}