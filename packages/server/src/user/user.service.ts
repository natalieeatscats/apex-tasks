import { Injectable } from '@nestjs/common'
import { UpdateUserDto } from './dto/update-user.dto'
import { PrismaService } from '../prisma.service'
import { RegisterDto } from '../auth/dto/auth.dto'
import { hash } from 'argon2'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: RegisterDto) {
    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: await hash(createUserDto.password)
      }
    })
  }

  async getAll() {
    const res = await this.prisma.user.findMany()
    res.forEach((user) => {
      delete user.password
    })
    return res
  }

  async getById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { tasks: true }
    })
  }

  async getByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } })
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: {
        ...updateUserDto
      }
    })
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: { id }
    })
  }
}
