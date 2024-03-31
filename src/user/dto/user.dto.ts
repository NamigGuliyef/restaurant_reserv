import { IsMobilePhone, IsNotEmpty, IsPhoneNumber, IsStrongPassword, Length, length, Matches } from "class-validator";

export class createUserDto {

  @IsNotEmpty({ message: "Ad boşdur" })
  @Matches(new RegExp("^[A-Za-zşəıöğüçƏIÖĞÜÇŞiİ]{3,20}$"))
  name: string
  @IsNotEmpty({ message: "Soyad boşdur" })
  @Matches(new RegExp("^[A-Za-zşəıöğüçƏIÖĞÜÇŞİi]{3,20}$"))
  surname: string
  @IsNotEmpty({ message: "Mobil nömrə boşdur" })
  @IsMobilePhone("az-AZ")
  @IsPhoneNumber("AZ")
  phone_number: string
  @IsNotEmpty({ message: "Şifrə boşdur" })
  @Length(8, 10, { message :"Şifrənin uzunluğunu 8 simvoldan az olmayaraq qeyd edin"})
  password: string

}
