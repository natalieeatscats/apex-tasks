import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards
} from '@nestjs/common'
import { UserService } from './user.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserGuard } from './user.guard'
import { AuthGuard } from '../auth/auth.guard'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(200)
  findAll() {
    return this.userService.getAll()
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.userService.getById(id)
  }

  @Patch(':id')
  @UseGuards(AuthGuard, UserGuard)
  @HttpCode(200)
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') targetId: string
  ) {
    return this.userService.update(targetId, updateUserDto)
  }

  @Delete()
  @UseGuards(AuthGuard, UserGuard)
  @HttpCode(200)
  remove(@Body() targetId: string) {
    return this.userService.remove(targetId)
  }
}
