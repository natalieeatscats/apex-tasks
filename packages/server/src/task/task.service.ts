import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { PrismaService } from '../prisma.service'

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  create(createTaskDto: CreateTaskDto, id: string) {
    return this.prisma.task.create({
      data: {
        ...createTaskDto,
        user: { connect: { id } }
      }
    })
  }

  getAll() {
    return this.prisma.task.findMany()
  }

  getById(id: string) {
    return this.prisma.task.findUnique({
      where: {
        id
      }
    })
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.prisma.task.update({
      where: {
        id
      },
      data: {
        ...updateTaskDto
      }
    })
  }

  remove(id: string) {
    return this.prisma.task.delete({
      where: {
        id
      }
    })
  }
}
