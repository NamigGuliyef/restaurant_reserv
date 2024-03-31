import { IsNotEmpty, IsOptional } from 'class-validator';
import mongoose from 'mongoose';

export class createReservDto {
  @IsNotEmpty()
  date: Date;
  @IsNotEmpty()
  time: string;
  @IsNotEmpty()
  person_count: number;
  @IsOptional()
  tableId: mongoose.Schema.Types.ObjectId;
  @IsOptional()
  reserved: boolean;
}
