import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { createReservDto } from 'src/reserv/dto/reserv.dto';
import { Reserv } from 'src/reserv/model/reserv.schema';
import { Restaurant } from 'src/restaurant/model/restaurant.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('/create-reserv')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async createRestaurantReserv(@Body() CreateReservDto: createReservDto): Promise<Reserv> {
    return await this.userService.createRestaurantReserv(CreateReservDto)
  }


  @Get('/my-reserv')
  @HttpCode(HttpStatus.CREATED)
  async getAllMyReserv(): Promise<Reserv[]> {
    return await this.userService.getAllMyReserv()
  }

  @Get('/restaurant')
  @HttpCode(HttpStatus.OK)
  async restaurantFilter(@Query('name') name: string): Promise<Restaurant[]> {
    return await this.userService.restaurantFilter(name)
  }
}

