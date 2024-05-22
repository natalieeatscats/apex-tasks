import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest()
    if (req.params['id'] !== req['actorId']) {
      throw new UnauthorizedException("Cannot modify other user's data")
    }
    return true
  }
}
