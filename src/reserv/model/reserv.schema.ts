import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class Reserv {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref:'user' })
  userId: Types.ObjectId;
  @Prop({ required: true })
  time: string;
  @Prop({ required: true })
  person_count: number;
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref:'restaurant' })
  restaurantId:Types.ObjectId
}

export const reservModel = SchemaFactory.createForClass(Reserv);
