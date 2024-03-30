import { IsNotEmpty, IsOptional } from 'class-validator';
import mongoose from 'mongoose';

export class createTableDto {
  @IsNotEmpty()
  number: number;
  @IsNotEmpty()
  person_count: number;
  @IsNotEmpty()
  restaurantId: mongoose.Schema.Types.ObjectId
  @IsOptional()
  reserved: boolean;
}


export class updateTableDto {
  @IsOptional()
  number: number;
  @IsOptional()
  person_count: number;
  @IsOptional()
  restaurantId: mongoose.Schema.Types.ObjectId
  @IsOptional()
  reserved: boolean;
}