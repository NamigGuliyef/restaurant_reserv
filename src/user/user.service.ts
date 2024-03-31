import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { tokenReqType } from 'src/middleware/tokenReqType';
import { createReservDto } from 'src/reserv/dto/reserv.dto';
import { Reserv } from 'src/reserv/model/reserv.schema';
import { Restaurant } from 'src/restaurant/model/restaurant.schema';

@Injectable()
export class UserService {
  constructor(
    @Inject(REQUEST) private readonly req: tokenReqType,
    @InjectModel('restaurant') private readonly restaurantModel: Model<Restaurant>,
    @InjectModel('reserv') private readonly reservModel: Model<Reserv>
  ) { }


  // restoran axtarış
  async restaurantFilter(name: string): Promise<Restaurant[]> {
    const filter: any = {}
    if (name) filter.name = name
    const nameRegex = new RegExp(filter.name, 'i')
    return await this.restaurantModel.find({ name: nameRegex })
  }



  // restoran rezervasiya
  async createRestaurantReserv(CreateReservDto: createReservDto): Promise<Reserv> {
    return await this.reservModel.create({ ...CreateReservDto, userId: this.req.user._id })
  }

  // rezervləri görmək
  async getAllMyReserv(): Promise<Reserv[]> {
    return await this.reservModel.find({ userId: this.req.user._id }).populate([{ path: 'restaurantId', select: 'name' },
    { path: 'tableId', select: ['number', 'person_count'] }])
  }




}
