import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userModel } from 'src/user/model/user.schema';
import { restaurantModel } from 'src/restaurant/model/restaurant.schema';
import { reservModel } from 'src/reserv/model/reserv.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'user', schema: userModel },
      { name: 'restaurant', schema: restaurantModel },
      { name: 'reserv', schema: reservModel }
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
