import { IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class createReservDto {
  @IsNotEmpty()
  userId: mongoose.Schema.Types.ObjectId
  @IsNotEmpty()
  time: string;
  @IsNotEmpty()
  person_count: number;
}
