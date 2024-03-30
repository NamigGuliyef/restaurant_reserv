import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { messageResponse } from 'src/auth/auth.type';
import { Reserv } from 'src/reserv/model/reserv.schema';
import { createRestaurantDto, updateRestaurantDto } from 'src/restaurant/dto/restaurant.dto';
import { Restaurant } from 'src/restaurant/model/restaurant.schema';
import { createTableDto, updateTableDto } from 'src/table/dto/table.dto';
import { Table } from 'src/table/model/table.schema';
import { User } from 'src/user/model/user.schema';
import { reservConfirmationDto } from './admin.type';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel('restaurant') private readonly restaurantModel: Model<Restaurant>,
    @InjectModel('user') private readonly userModel: Model<User>,
    @InjectModel('table') private readonly tableModel: Model<Table>, @InjectModel('reserv') private readonly reservModel: Model<Reserv>
  ) { }

  // restoran yarat
  async createRestaurant(CreateRestaurantDto: createRestaurantDto): Promise<Restaurant> {
    const restaurant = await this.restaurantModel.findOne({ name: CreateRestaurantDto.name })
    if (restaurant) throw new HttpException('Restoran adı artıq var', HttpStatus.CONFLICT)
    return await this.restaurantModel.create(CreateRestaurantDto)
  }


  // restoran adı dəyiş
  async updateRestaurant(id: string, UpdateRestaurantDto: updateRestaurantDto): Promise<messageResponse> {
    const restaurant = await this.restaurantModel.findOne({ name: UpdateRestaurantDto.name })
    if (restaurant) throw new HttpException('Restoran adı artıq var', HttpStatus.NOT_FOUND)
    await this.restaurantModel.findByIdAndUpdate(id, { $set: UpdateRestaurantDto }, { new: true })
    return { message: "Məlumat dəyişildi." }
  }


  // Bütün restoranlara bax
  async getAllRestaurant(): Promise<Restaurant[]> {
    return await this.restaurantModel.find()
  }


  // restoran üçün stol yarat
  async createTable(CreateTableDto: createTableDto): Promise<messageResponse> {
    const tableExist = await this.tableModel.findOne({ number: CreateTableDto.number, restaurantId: CreateTableDto.restaurantId })
    if (tableExist) throw new HttpException('Restoranda qeyd olunan №-li masa var', HttpStatus.CONFLICT)
    const newTable = await this.tableModel.create(CreateTableDto)
    await this.restaurantModel.findOneAndUpdate({ _id: newTable.restaurantId }, { $push: { tableIds: newTable._id } })
    return { message: "Yeni masa yarandı" }
  }


  // Stolda dəyişiklik
  async updateTable(id: string, UpdateTableDto: updateTableDto): Promise<messageResponse> {
    const tableExist = await this.tableModel.findOne({ number: UpdateTableDto.number, restaurantId: UpdateTableDto.restaurantId })
    if (tableExist) throw new HttpException('Restoranda qeyd olunan №-li masa var', HttpStatus.CONFLICT)
    return await this.tableModel.findByIdAndUpdate(id, { $set: UpdateTableDto })
  }


  // Restoranlar üzrə bütün masalara bax
  async getTableByRestaurant(restId: string): Promise<Table[]> {
    return await this.tableModel.find({ restaurantId: restId })
  }


  // Bütün masalara bax
  async getAllRestaurantTables(): Promise<Table[]> {
    return await this.tableModel.find()
  }


  // Adminin reserv təsdiqi, təsdiq zamanı istifadəçinin mənim rezervlərim bölməsinə rezervi əlavə edir və həmçinin masanıda rezerv edirik
  async userReservConfirmation(reservConfirmationDto: reservConfirmationDto): Promise<messageResponse> {
    const { reservId, tableId } = reservConfirmationDto
    const reservExist = await this.reservModel.findById(reservId)
    if (reservExist.reserved === true) throw new HttpException('İstifadəçinin rezervi artiq təsdiq edilib', HttpStatus.CONFLICT)
    const reservTableExist = await this.tableModel.findById(tableId)
    if (reservTableExist.reserved === true) throw new HttpException('Masa artiq rezerv edilib', HttpStatus.CONFLICT)
    const reservConfirmation = await this.reservModel.findByIdAndUpdate(reservId,
      { $set: { reserved: true, table_number: reservTableExist.number } }, { new: true })
    await this.tableModel.findByIdAndUpdate(tableId, { $set: { reserved: true }, $push: { booking_persons: reservConfirmation._id } })
    await this.userModel.findByIdAndUpdate({ _id: reservConfirmation.userId }, { $push: { my_reservIds: reservConfirmation._id } }, { new: true })
    return { message: `İstifadəçinin reservi təsdiqləndi və ${reservTableExist.number} № -li masa reserv edildi.` }
  }
}



  // Restoran ve ya restoranlar üzrə boş masalara bax

  // Admin tarixler arasi ve saatlar arasi axtarış



