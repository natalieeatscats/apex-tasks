import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator'
import { $Enums } from '../../../prisma/generated'
import Status = $Enums.Status

export class CreateTaskDto {
  @IsString()
  @MinLength(6, { message: 'Task name must be at least 6 characters long' })
  @MaxLength(40, { message: 'Task name must be at most 40 characters long' })
  name: string

  @IsString()
  @IsOptional()
  @MaxLength(3000, {
    message: 'Task description must be at most 3000 characters long'
  })
  @IsOptional()
  description?: string

  @IsEnum(Status)
  @IsOptional()
  status: Status
}
