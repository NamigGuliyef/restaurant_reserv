import { IsNotEmpty, IsMobilePhone, IsPhoneNumber, IsStrongPassword } from 'class-validator'

export interface messageResponse {
  message: string
}


export class userSignIn {
  @IsNotEmpty({ message: "Mobil nömrə boşdur" })
  @IsMobilePhone("az-AZ")
  @IsPhoneNumber("AZ")
  phone_number: string
  @IsNotEmpty({ message: "Şifrə boşdur" })
  @IsStrongPassword({ minLength: 8 }, { message: "Şifrənin uzunluğunu 8 simvoldan az olmayaraq qeyd edin" })
  password: string

}


export interface tokenResponse {
  token: string,
  message: string,
  role: string
}

