import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  SetMetadata,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { RedisCacheService } from 'src/core/redis/redis-cache.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private readonly redisCacheService: RedisCacheService,
  ) {
    super();
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    //是否跳过登陆
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authorization = request['headers'].authorization || void 0;
    let tokenNotTimeOut = true;
    if (authorization) {
      const token = authorization.split(' ')[1]; // authorization: Bearer xxx
      try {
        const payload: any = this.jwtService.decode(token);
        const key = `user:accessToken:${payload.sub}`;
        const redis_token = await this.redisCacheService.cacheGet(key);

        if (!redis_token || redis_token !== token) {
          throw new UnauthorizedException('请重新登录');
        }
      } catch (err) {
        tokenNotTimeOut = false;
        throw new UnauthorizedException('请重新登录');
      }
    }
    return tokenNotTimeOut && (super.canActivate(context) as boolean);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleRequest(err, user, _info) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}

export const IS_PUBLIC_KEY = 'isPublic';
export const SkipAuth = () => SetMetadata(IS_PUBLIC_KEY, true);
