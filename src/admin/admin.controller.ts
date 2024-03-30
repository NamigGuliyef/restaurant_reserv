import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { messageResponse } from 'src/auth/auth.type';
import { createRestaurantDto, updateRestaurantDto } from 'src/restaurant/dto/restaurant.dto';
import { Restaurant } from 'src/restaurant/model/restaurant.schema';
import { createTableDto, updateTableDto } from 'src/table/dto/table.dto';
import { Table } from 'src/table/model/table.schema';
import { AdminService } from './admin.service';
import { reservConfirmationDto } from './admin.type';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Post('/dashboard/restaurant')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async createRestaurant(@Body() CreateRestaurantDto: createRestaurantDto): Promise<Restaurant> {
    return await this.adminService.createRestaurant(CreateRestaurantDto)
  }


  @Patch('/dashboard/restaurant/:id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async updateRestaurant(@Param('id') id: string, @Body() UpdateRestaurantDto: updateRestaurantDto): Promise<messageResponse> {
    return await this.adminService.updateRestaurant(id, UpdateRestaurantDto)
  }


  @Get('/dashboard/restaurants')
  @HttpCode(HttpStatus.OK)
  async getAllRestaurant(): Promise<Restaurant[]> {
    return await this.adminService.getAllRestaurant()
  }


  @Post('/dashboard/table')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async createTable(@Body() CreateTableDto: createTableDto): Promise<messageResponse> {
    return await this.adminService.createTable(CreateTableDto)
  }


  @Patch('/dashboard/table/:id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async updateTable(@Param('id') id: string, @Body() UpdateTableDto: updateTableDto): Promise<messageResponse> {
    return await this.adminService.updateTable(id, UpdateTableDto)
  }


  @Get('/dashboard/table/:restId')
  @HttpCode(HttpStatus.OK)
  async getTableByRestaurant(@Param('restId') restId: string): Promise<Table[]> {
    return await this.adminService.getTableByRestaurant(restId)
  }


  @Get('/dashboard/tables')
  @HttpCode(HttpStatus.OK)
  async getAllRestaurantTables(): Promise<Table[]> {
    return await this.adminService.getAllRestaurantTables()
  }


  @Post('/dashboard/reserv-confirmation')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async userReservConfirmation(@Body() reservConfirmationDto: reservConfirmationDto): Promise<messageResponse> {
    return await this.adminService.userReservConfirmation(reservConfirmationDto)
  }


}
