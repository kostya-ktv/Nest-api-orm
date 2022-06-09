import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./App/app.module";
import { JWTAuthGuard } from "./Guards/jwt-auth.guard";

const start = async () => {
   const PORT = process.env.APP_PORT
   const APP = await NestFactory.create(AppModule)

   const SwaggerConfig = new DocumentBuilder()
   .setTitle('Nest API')
   .setDescription('Swagger Documentation')
   .setVersion('1.0.0')
   .addTag('NestJS')
   .build()
   const SwaggerDocument = SwaggerModule.createDocument(APP, SwaggerConfig)
   SwaggerModule.setup('/api/docs', APP, SwaggerDocument)

   APP.listen(PORT, () => console.log('server started on port: ' + process.env.APP_PORT))
}

start()