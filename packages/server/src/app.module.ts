import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { TaskModule } from './task/task.module'

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UserModule, TaskModule],
  controllers: [],
  providers: []
})
export class AppModule {}
