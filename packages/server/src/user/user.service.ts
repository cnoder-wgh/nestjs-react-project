import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { isEmpty } from 'lodash';
import * as bcrypt from 'bcryptjs';
import { Logger } from 'src/logger/logger.decorator';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Logger('AppService') private logger: LoggerService,
  ) {}

  async findByUsername(username: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: { username },
    });
  }

  async findById(id: number, withItems = false): Promise<User> {
    if (withItems) {
      return this.usersRepository.findOne({
        where: { id },
        relations: ['todoItems'],
      });
    }
  }

  async register(registerDto: RegisterDto): Promise<void> {
    const { email, password } = registerDto;
    const isExsitUser = await this.usersRepository.findOneBy({ email });
    if (!isEmpty(isExsitUser)) {
      throw new ConflictException(`email:${email} is existed`);
    }
    const saltRounds = 10; // 设置哈希计算的迭代次数，值越高越安全但也需要更长的计算时间

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = {
      ...registerDto,
      password: hashedPassword,
    };
    const result = await this.usersRepository.save(user);
    console.log(result);
  }
}
