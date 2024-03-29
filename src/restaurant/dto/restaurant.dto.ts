import { IsNumber, IsOptional } from 'class-validator';

export class createRestaurantDto {
  @IsOptional()
  name: string;
  @IsOptional()
  @IsNumber()
  table: number;
  @IsOptional()
  reserved: boolean;
}
