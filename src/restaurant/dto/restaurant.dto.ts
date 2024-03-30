import { IsNotEmpty, IsOptional } from 'class-validator';

export class createRestaurantDto {
  @IsNotEmpty()
  name: string;
}


export class updateRestaurantDto {
  @IsOptional()
  name: string;
}