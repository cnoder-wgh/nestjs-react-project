import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
//import { User } from 'database/user.model';
import { UserService } from './user.service';
import { RegisterDto } from './user.dto';

@Controller({ path: '/users' })
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  getUser(
    @Param('id', ValidationPipe) id: number,
    @Query('withPosts', new DefaultValuePipe(false)) withItems?: boolean,
  ) {
    return this.userService.findById(+id, withItems);
  }

  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    return this.userService.register(registerDto);
  }
}
