import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import {plainToInstance} from 'class-transformer'
import {validate} from 'class-validator'
import { ValidationException } from "src/Exceptions/validation.exception";

@Injectable()
export class ValidationPipe implements PipeTransform{
   async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
       const object = plainToInstance(metadata.metatype, value)
       const errors = await validate(object)

       if(errors.length) {
          let message = errors.map(err => {
             return `${err.property} - ${Object.values(err.constraints).join(', ')}`
          })
          throw new ValidationException(message)
       }
       return value
   }
}