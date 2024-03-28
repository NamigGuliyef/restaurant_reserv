import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { hashPassword } from 'src/helpers/hashPass';
import { createUserDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/model/user.schema';
import { messageResponse, tokenResponse, userSignIn } from './auth.type';


@Injectable()
export class AuthService {
  constructor(@InjectModel('user') private readonly userModel: Model<User>) { }

  async signUp(createUserDto: createUserDto): Promise<messageResponse> {
    //  yeni istifadəçinin nömrəsinin qeydiyyat zamanı yoxlanması
    const userExist = await this.userModel.findOne({ phone_number: createUserDto.phone_number })
    if (userExist) throw new HttpException('Qeyd edilən nömrə ilə artıq istifadəçi var', HttpStatus.CONFLICT)
    // yeni istifadəçi bazada yaradılır
    await this.userModel.create({ ...createUserDto, password: await hashPassword(createUserDto.password) })
    return { message: "Yeni istifadəçi uğurla yaradıldı." }
  }


  // async signIn(userSignIn: userSignIn): Promise<tokenResponse> {
  //   const { phone_number, password } = userSignIn
  //   const userExist = await this.userModel.findOne({ phone_number: createUserDto.phone_number })



  // }



}
