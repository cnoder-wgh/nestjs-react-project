import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { LoggerModule } from 'src/logger/logger.module';
@Module({
  imports: [TypeOrmModule.forFeature([User]), LoggerModule.forRoot()],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
