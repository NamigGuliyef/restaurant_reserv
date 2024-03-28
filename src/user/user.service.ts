import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { User } from './model/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('user') private readonly userModel: Model<User>) { }

}
