import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { uri } from './config/mongodbUri';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [UserModule, MongooseModule.forRoot(uri), AuthModule],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule { }
