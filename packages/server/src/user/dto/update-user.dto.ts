import { IsOptional, IsString, MinLength } from 'class-validator'

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'Username must be at least 6 characters long' })
  name?: string

  @IsOptional()
  @IsString()
  email?: string

  @IsOptional()
  @IsString()
  @MinLength(8, {
    message: 'Password must be at least 8 characters long'
  })
  password?: string
}
