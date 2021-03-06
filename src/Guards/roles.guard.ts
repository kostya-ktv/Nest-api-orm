import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import {JwtService} from '@nestjs/jwt'
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./roles-auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
   constructor(
      private JWTservice: JwtService,
      private reflector: Reflector
      ){}

   canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

       try {
          const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
             context.getHandler(),
             context.getClass(),
          ])
          if(!requiredRoles) {
             return true
          }
          
          const req: any = context.switchToHttp().getRequest()
          const authHeader: string = req.headers.authorization;
          const bearer = authHeader.split(' ')[0]
          const token = authHeader.split(' ')[1]

          if(bearer !== 'Bearer' || !token) {
            throw new UnauthorizedException({message: 'unauthorized user'})
          }

          const user = this.JWTservice.verify(token)
          req.user = user
          return user.roles.some(role => requiredRoles.includes(role.value))

       } catch (error) {
          throw new HttpException('Access denied ', HttpStatus.FORBIDDEN)
       }
   }
}