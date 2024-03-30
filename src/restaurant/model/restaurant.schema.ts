import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class Restaurant {
  @Prop({ required: true })
  name: string;
  @Prop({ type: [mongoose.Schema.Types.ObjectId], required: true, ref: "table" })
  tableIds: string[];

}

export const restaurantModel = SchemaFactory.createForClass(Restaurant);
