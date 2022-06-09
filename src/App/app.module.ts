import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { Post } from "src/posts/post.model";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";
import { User } from "src/Users/users.model";
import { UsersModule } from "src/Users/users.module";
import {ServeStaticModule} from '@nestjs/serve-static'
import { join, resolve } from "path";

@Module({
   controllers: [],
   providers: [],
   imports: [
      ConfigModule.forRoot({
         envFilePath: `.${process.env.NODE_ENV}.env`,
       }),
      ServeStaticModule.forRoot({
         rootPath: resolve(__dirname, 'static')
      }),
      SequelizeModule.forRoot({
         dialect: 'postgres',
         host: process.env.POSTGRES_HOST,
         port: +process.env.POSTGRES_PORT,
         username: process.env.POSTGRES_USER,
         password: process.env.POSTGRES_PASSWORD,
         database: process.env.POSTGRES_DB,
         models: [User, Role, UserRoles, Post],
         autoLoadModels: true
       }),
      UsersModule,
   ]
})
export class AppModule {

}