import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class Table {
  @Prop({ required: true })
  number: number;
  @Prop({ required: true })
  person_count: number;
  @Prop({ required: true, ref: 'restaurant' })
  restaurantId: mongoose.Schema.Types.ObjectId;
  @Prop({ type: [mongoose.Schema.Types.ObjectId], required: true, ref: 'user' })
  booking_persons: string[];
  @Prop({ required: true, default: false })
  reserved: boolean;
}

export const tableModel = SchemaFactory.createForClass(Table);