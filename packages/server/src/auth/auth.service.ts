import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AccessToken } from './interface/access-token.interface';
import { JwtPayload } from './interface/jwt-payload.interface';
import { UserPrincipal } from './interface/user-principal.interface';
import { User } from 'src/entities/user.entity';
import { compare } from 'bcrypt';
import { RedisCacheService } from 'src/core/redis/redis-cache.service';
const MILLISECONDS_PER_DAY: number = 24 * 60 * 60 * 1000;

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private readonly redisCacheService: RedisCacheService,
    //@Inject(Req) private readonly request: Request,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      return null;
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async login(user: UserPrincipal): Promise<AccessToken> {
    const payload: JwtPayload = {
      upn: user.username, //upn is defined in Microprofile JWT spec, a human readable principal name.
      sub: user.id,
      email: user.email,
      roles: user.roles,
    };
    const token = await this.jwtService.signAsync(payload);
    const key = `user:accessToken:${user.id}`;
    await this.redisCacheService.cacheSet(
      key,
      `${token}`,
      MILLISECONDS_PER_DAY,
    );
    return { access_token: token };
  }

  async loginout(user: UserPrincipal): Promise<{ message: string }> {
    const key = `user:accessToken:${user.id}`;
    await this.redisCacheService.cacheDel(key);
    return { message: '成功' };
  }
}
