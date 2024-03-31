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
import { reservFilter, tableFilter } from './query.type';

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


  // restoran üçün masa yarat
  async createTable(CreateTableDto: createTableDto): Promise<messageResponse> {
    const tableExist = await this.tableModel.findOne({ number: CreateTableDto.number, restaurantId: CreateTableDto.restaurantId })
    if (tableExist) throw new HttpException('Restoranda qeyd olunan №-li masa var', HttpStatus.CONFLICT)
    const newTable = await this.tableModel.create(CreateTableDto)
    await this.restaurantModel.findOneAndUpdate({ _id: newTable.restaurantId }, { $push: { tableIds: newTable._id } })
    return { message: "Yeni masa yarandı" }
  }


  // Stolda dəyişiklik - masa №-sinə görə
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


  // Masalar üzrə boş yerləri və nəfər sayını filter et 
  async getTableFilter(TableFilter: tableFilter): Promise<Table[]> {
    const { min_person_count, max_person_count, reserved } = TableFilter
    const filter: any = {}
    if (reserved) filter.reserved = reserved
    if (min_person_count && max_person_count) filter.person_count = { $gte: min_person_count, $lte: max_person_count }
    return await this.tableModel.find(filter)
  }



  // Adminin reserv təsdiqi, təsdiq zamanı istifadəçinin mənim rezervlərim bölməsinə rezervi əlavə edir və həmçinin masanıda rezerv edirik
  async userReservConfirmation(reservConfirmationDto: reservConfirmationDto): Promise<messageResponse> {
    const { reservId, tableId } = reservConfirmationDto
    const reservExist = await this.reservModel.findById(reservId)
    if (reservExist.reserved === true) throw new HttpException('İstifadəçinin rezervi artiq təsdiq edilib', HttpStatus.CONFLICT)
    const reservTableExist = await this.tableModel.findById(tableId)
    if (reservTableExist.reserved === true) throw new HttpException('Masa artiq rezerv edilib', HttpStatus.CONFLICT)
    const reservConfirmation = await this.reservModel.findByIdAndUpdate(reservId,
      { $set: { reserved: true, tableId: reservTableExist._id } }, { new: true })
    await this.tableModel.findByIdAndUpdate(tableId, { $set: { reserved: true }, $push: { booking_persons: reservConfirmation._id } })
    await this.userModel.findByIdAndUpdate({ _id: reservConfirmation.userId }, { $push: { my_reservIds: reservConfirmation._id } }, { new: true })
    return { message: `İstifadəçinin reservi təsdiqləndi və ${reservTableExist.number} № -li masa reserv edildi.` }
  }


  // Bütün reservlər
  async getAllUserReserv(): Promise<Reserv[]> {
    return await this.reservModel.find({ reserved: true })
  }


  // Rezervler üzrə axtarış
  async getReservFilter(ReservFilter: reservFilter): Promise<Reserv[]> {
    const { reserved, start_date, end_date, start_time, end_time, min_person_count, max_person_count } = ReservFilter
    const filter: any = {}
    if (reserved) filter.reserved = reserved
    if (start_date && end_date) filter.date = { $gte: start_date, $lte: end_date }
    if (start_time && end_time) filter.time = { $gte: start_time, $lte: end_time }
    if (min_person_count && max_person_count) filter.person_count = { $gte: min_person_count, $lte: max_person_count }
    return await this.reservModel.find(filter)
  }


  // aktiv olan rezervi ləğv etmək və bazadan silmək
  async getReservDeactive(reservId: string): Promise<messageResponse> {
    const reserv = await this.reservModel.findOne({ _id: reservId, reserved: true })
    if (!reserv) throw new HttpException("Bu rezerv aktiv deyil və ya bazadan artıq silinib!", HttpStatus.NOT_FOUND)
    await this.userModel.findByIdAndUpdate({ _id: reserv.userId }, { $pull: { my_reservIds: reserv._id } })
    await this.tableModel.findByIdAndUpdate({ _id: reserv.tableId }, { $set: { reserved: false }, $pull: { booking_persons: reserv._id } })
    await this.reservModel.findByIdAndDelete({ _id: reservId })
    return { message: "Rezerv deaktiv olundu və bazadan silindi!" }
  }


}




