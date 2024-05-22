import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../prisma.service'

@Injectable()
export class TaskGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest()
    const targetTaskId = req.params['id']
    const targetTask = await this.prisma.task.findUnique({
      where: { id: targetTaskId },
      include: { user: true }
    })
    if (!targetTask) {
      throw new BadRequestException()
    }
    const taskUserId = targetTask.user['id']
    if (taskUserId !== req['actorId']) {
      throw new UnauthorizedException("Cannot modify other user's tasks")
    }
    return true
  }
}
