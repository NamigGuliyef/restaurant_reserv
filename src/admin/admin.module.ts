import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userModel } from 'src/user/model/user.schema';
import { restaurantModel } from 'src/restaurant/model/restaurant.schema';
import { reservModel } from 'src/reserv/model/reserv.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'user', schema: userModel },
      { name: 'restaurant', schema: restaurantModel },
      { name: 'reserv', schema: reservModel },
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
