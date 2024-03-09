import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  // 新版本ttl为毫秒
  async cacheSet(key: string, value: string, ttl: number) {
    return this.cacheManager.set(key, value, ttl);
  }

  async cacheGet(key: string): Promise<string> {
    return this.cacheManager.get(key);
  }

  async cacheDel(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }
}
