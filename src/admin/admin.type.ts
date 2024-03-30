import { IsNotEmpty } from "class-validator";
import mongoose from "mongoose";

export class reservConfirmationDto {
  @IsNotEmpty()
  reservId: mongoose.Schema.Types.ObjectId
  @IsNotEmpty()
  tableId: mongoose.Schema.Types.ObjectId
}