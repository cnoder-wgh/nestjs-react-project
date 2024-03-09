import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SkipAuth } from './auth/guard/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @SkipAuth()
  @Get()
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }
}
