import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { PrismaService } from '../prisma.service'
import { JwtService } from '@nestjs/jwt'
import { AuthService } from '../auth/auth.service'

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, JwtService, AuthService],
  exports: [UserService]
})
export class UserModule {}
