import { IsEmail, IsString, MinLength } from 'class-validator'

export class AuthDto {
  @IsString()
  @IsEmail()
  email: string

  @IsString()
  @MinLength(8, {
    message: 'Password must be at least 8 characters long'
  })
  password: string
}

export class RegisterDto {
  @IsString()
  @MinLength(6, { message: 'Username must be at least 6 characters long' })
  name: string

  @IsString()
  @IsEmail()
  email: string

  @IsString()
  @MinLength(8, {
    message: 'Password must be at least 8 characters long'
  })
  password: string
}
