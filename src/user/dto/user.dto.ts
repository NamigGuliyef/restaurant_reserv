import { IsMobilePhone, IsNotEmpty, IsPhoneNumber, IsStrongPassword, Matches } from "class-validator";

export class createUserDto {

  @IsNotEmpty({ message: "Ad boşdur" })
  @Matches(new RegExp("^[A-Za-zşəıöğüçƏIÖĞÜÇŞ]$"))
  name: string
  @IsNotEmpty({ message: "Soyad boşdur" })
  @Matches(new RegExp("^[A-Za-zşəıöğüçƏIÖĞÜÇŞ]$"))
  surname: string
  @IsNotEmpty({ message: "Mobil nömrə boşdur" })
  @IsMobilePhone("az-AZ")
  @IsPhoneNumber("AZ")
  phone_number: string
  @IsNotEmpty({ message: "Şifrə boşdur" })
  @IsStrongPassword({ minLength: 8 }, { message :"Şifrənin uzunluğunu 8 simvoldan az olmayaraq qeyd edin"})
  password: string

}
