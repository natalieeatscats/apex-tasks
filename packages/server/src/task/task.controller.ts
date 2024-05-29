import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Req,
  UseGuards
} from '@nestjs/common'
import { TaskService } from './task.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { AuthGuard } from '../auth/auth.guard'
import { TaskGuard } from './task.guard'

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(200)
  create(@Body() createTaskDto: CreateTaskDto, @Req() req) {
    return this.taskService.create(createTaskDto, req?.actorId)
  }

  @Get()
  @HttpCode(200)
  findMany() {
    return this.taskService.getAll()
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.taskService.getById(id)
  }

  @Patch(':id')
  @UseGuards(AuthGuard, TaskGuard)
  @HttpCode(200)
  update(@Body() updateTaskDto: UpdateTaskDto, @Param('id') id: string) {
    return this.taskService.update(id, updateTaskDto)
  }

  @Delete(':id')
  @UseGuards(AuthGuard, TaskGuard)
  @HttpCode(200)
  remove(@Param('id') id: string) {
    return this.taskService.remove(id)
  }
}
