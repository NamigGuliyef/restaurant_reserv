import { IsNotEmpty, IsOptional } from 'class-validator';

export class createReservDto {
  @IsNotEmpty()
  date: Date;
  @IsNotEmpty()
  time: string;
  @IsNotEmpty()
  person_count: number;
  @IsOptional()
  table_number: number;
  @IsOptional()
  reserved: boolean;
}
