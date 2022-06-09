import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import {JwtService} from '@nestjs/jwt'

@Injectable()
export class JWTAuthGuard implements CanActivate {
   constructor(private JWTservice: JwtService){}

   canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
       
       try {
          const req: any = context.switchToHttp().getRequest()
          const authHeader: string = req.headers.authorization;
          const bearer = authHeader.split(' ')[0]
          const token = authHeader.split(' ')[1]
          if(bearer !== 'Bearer' || !token) {
            throw new UnauthorizedException({message: 'unauthorized user'})
          }
          const user = this.JWTservice.verify(token)
          req.user = user
          return true
       } catch (error) {
          throw new UnauthorizedException({message: 'unauthorized user'})
       }
   }
}