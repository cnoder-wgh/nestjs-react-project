import { Injectable } from '@nestjs/common';
import { RedisCacheService } from './core/redis/redis-cache.service';

@Injectable()
export class AppService {
  constructor(private readonly redisCacheService: RedisCacheService) {}

  async getHello(): Promise<string> {
    const result = await this.redisCacheService.cacheGet('test');
    return result;
  }
}
