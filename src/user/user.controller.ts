import { Body, Controller, Get, HttpCode, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { createReservDto } from 'src/reserv/dto/reserv.dto';
import { Reserv } from 'src/reserv/model/reserv.schema';
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
}

