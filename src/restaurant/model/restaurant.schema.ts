import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class Restaurant {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  table: number;
  @Prop({ required: true, default: false })
  reserved: boolean;
  @Prop({ type: [mongoose.Schema.Types.ObjectId], required: true, ref: 'user' })
  booking_persons: string[];
}

export const restaurantModel = SchemaFactory.createForClass(Restaurant);
