import {IsString, IsNumber} from 'class-validator'

export class AddRoleDTO {
   @IsString({message: 'need to be a string'})
   readonly value: string

   @IsNumber({}, {message: 'need to be a number'})
   readonly userID: number
}