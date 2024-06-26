import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { restaurantModel } from 'src/restaurant/model/restaurant.schema';
import { reservModel } from 'src/reserv/model/reserv.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'restaurant', schema: restaurantModel },
      { name: 'reserv', schema: reservModel }
    ]),
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
