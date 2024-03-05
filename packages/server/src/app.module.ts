import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MysqlModule } from './core/mysql/mysql.module';
import { RedisCacheModule } from './core/redis/redis-cache.module';
import { LoggerModule } from './logger/logger.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [path.join(__dirname, '../../../.env')],
    }),
    MysqlModule,
    RedisCacheModule,
    AuthModule,
    UserModule,
    LoggerModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
