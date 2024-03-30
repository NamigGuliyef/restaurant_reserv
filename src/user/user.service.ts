import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { tokenReqType } from 'src/middleware/tokenReqType';
import { createReservDto } from 'src/reserv/dto/reserv.dto';
import { Reserv } from 'src/reserv/model/reserv.schema';
import { User } from './model/user.schema';

@Injectable()
export class UserService {
  constructor(
    @Inject(REQUEST) private readonly req: tokenReqType,
    // @InjectModel('user') private readonly userModel: Model<User>,
    @InjectModel('reserv') private readonly reservModel: Model<Reserv>
  ) { }


  // restoran rezervasiya
  async createRestaurantReserv(CreateReservDto: createReservDto): Promise<Reserv> {
    return await this.reservModel.create({ ...CreateReservDto, userId: this.req.user._id })
  }

  // rezervləri görmək
  async getAllMyReserv(): Promise<Reserv[]> {
    return await this.reservModel.find({ userId: this.req.user._id }).populate([{ path: 'restaurantId', select: '-tableIds' }])
  }




}
