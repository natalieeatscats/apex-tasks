import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest()
    const auth = req.headers.authorization.split('Bearer ')[1]
    try {
      const payload = await this.jwt.verifyAsync(auth, {
        secret: process.env.JWT_SECRET
      })
      req['actorId'] = payload.id
    } catch {
      throw new UnauthorizedException()
    }
    return true
  }
}
