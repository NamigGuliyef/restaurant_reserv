import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { uri } from './config/mongodbUri';
import { adminAuthMiddleware, userAuthMiddleware } from './middleware/authMiddleware';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AdminController } from './admin/admin.controller';

@Module({
  imports: [UserModule, MongooseModule.forRoot(uri), AuthModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule { 
configure(consumer: MiddlewareConsumer) {
    consumer.apply(userAuthMiddleware).forRoutes(UserController)
    consumer.apply(adminAuthMiddleware).forRoutes(AdminController)
}

}
