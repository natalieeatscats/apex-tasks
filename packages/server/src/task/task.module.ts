import { Module } from '@nestjs/common'
import { TaskService } from './task.service'
import { TaskController } from './task.controller'
import { PrismaService } from '../prisma.service'
import { JwtService } from '@nestjs/jwt'
import { AuthService } from '../auth/auth.service'
import { UserService } from '../user/user.service'

@Module({
  controllers: [TaskController],
  providers: [TaskService, PrismaService, JwtService, AuthService, UserService]
})
export class TaskModule {}
