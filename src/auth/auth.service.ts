import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { comparePassword, hashPassword } from 'src/helpers/hashPass';
import { createUserDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/model/user.schema';
import { messageResponse, tokenResponse, userSignIn } from './auth.type';
import { sign } from 'jsonwebtoken'
import { jwtSecret } from 'src/config/jwtSecret';

@Injectable()
export class AuthService {
  constructor(@InjectModel('user') private readonly userModel: Model<User>) { }

  // istifadəçi qeydiyyatı
  async signUp(CreateUserDto: createUserDto): Promise<messageResponse> {
    //  yeni istifadəçinin nömrəsinin qeydiyyat zamanı yoxlanması
    const userExist = await this.userModel.findOne({ phone_number: CreateUserDto.phone_number })
    if (userExist) throw new HttpException('Qeyd edilən nömrə ilə artıq istifadəçi var', HttpStatus.CONFLICT)
    // yeni istifadəçi bazada yaradılır
    await this.userModel.create({ ...CreateUserDto, password: await hashPassword(CreateUserDto.password) })
    return { message: "Yeni istifadəçi uğurla yaradıldı." }
  }

  // istifadəçi girişi
  async signIn(UserSignIn: userSignIn): Promise<tokenResponse> {
    const { phone_number, password } = UserSignIn
    const userExist = await this.userModel.findOne({ phone_number })
    if (!userExist) throw new HttpException('İstifadəçi tapılmadı', HttpStatus.NOT_FOUND)
    const passRight = await comparePassword(password, userExist.password)
    if (!passRight) throw new HttpException('Şifrə doğru deyil', HttpStatus.UNAUTHORIZED)
    const token = sign({ _id: userExist._id ,role:userExist.role}, jwtSecret, { expiresIn: '12h' })
    return { role: userExist.role, message: "Uğurlu giriş", token }
  }

}
