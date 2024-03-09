import { Module } from '@nestjs/common';
import { TodoItemService } from './item.service';
import { TodoItemController } from './item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoItem } from 'src/entities/todo-item.entity';
import { LoggerModule } from 'src/logger/logger.module';
import { RedisCacheService } from 'src/core/redis/redis-cache.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([TodoItem]), LoggerModule.forRoot()],
  providers: [TodoItemService, JwtService, RedisCacheService],
  exports: [TodoItemService],
  controllers: [TodoItemController],
})
export class ItemModule {}
