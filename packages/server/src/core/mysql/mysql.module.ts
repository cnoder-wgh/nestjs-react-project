import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get('MYSQL_HOST'),
          port: configService.get('MYSQL_PORT'),
          username: configService.get('MYSQL_USERNAME'),
          password: configService.get('config.MYSQL_PASSWORD'),
          database: configService.get('MYSQL_DATABASE'),
          entities: [path.join(__dirname, '../../**/*.entity{.ts,.js}')],
          synchronize: false,
          // logging:
          //   process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'dev',
        };
      },
    }),
  ],
})
export class MysqlModule {}
