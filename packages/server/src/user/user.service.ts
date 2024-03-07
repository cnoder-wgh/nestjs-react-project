import { ConflictException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RegisterDto } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { isEmpty } from 'lodash';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findById(id: string, withPosts = false): Observable<any> {
    return null;
  }

  async register(registerDto: RegisterDto): Promise<void> {
    const email = registerDto.email;
    const isExsitUser = await this.usersRepository.findOneBy({ email });
    if (!isEmpty(isExsitUser)) {
      throw new ConflictException(`email:${email} is existed`);
    }
    const user = {
      ...registerDto,
      password: encryptPwd
    }
    await this.usersRepository.create(registerDto);
  }
}
