import { Injectable } from '@nestjs/common';
import { RedisCacheService } from './core/redis/redis-cache.service';
import { Logger } from './logger/logger.decorator';
import { LoggerService } from './logger/logger.service';

@Injectable()
export class AppService {
  constructor(
    private readonly redisCacheService: RedisCacheService,
    @Logger('AppService') private logger: LoggerService,
  ) {}

  async getHello(): Promise<string> {
    this.logger.log('Hello World');
    const result = await this.redisCacheService.cacheGet('test');
    return result;
  }
}
