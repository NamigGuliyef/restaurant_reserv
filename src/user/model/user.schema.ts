import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'

@Schema({ versionKey: false, timestamps: true })
export class User {
  @Prop({ required: true })
  name: string
  @Prop({ required: true })
  surname: string
  @Prop({ required: true })
  phone_number: string
  @Prop({ required: true })
  password: string
  @Prop({ type: [mongoose.Schema.Types.ObjectId], required: true, ref: 'reserv' })
  my_reservIds: string[]
  @Prop({ default: "user" })
  role: string
  _id: string
}

export const userModel = SchemaFactory.createForClass(User)
