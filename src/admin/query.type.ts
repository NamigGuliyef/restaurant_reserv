import { IsOptional } from "class-validator";

export class tableFilter {
  @IsOptional()
  reserved: boolean
  @IsOptional()
  min_person_count: number
  @IsOptional()
  max_person_count: number
}


export class reservFilter {
  @IsOptional()
  reserved: boolean
  @IsOptional()
  start_date: Date
  @IsOptional()
  end_date: Date
  @IsOptional()
  start_time: string
  @IsOptional()
  end_time: string
  @IsOptional()
  min_person_count: number
  @IsOptional()
  max_person_count: number
}