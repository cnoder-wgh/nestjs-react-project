import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthenticatedRequest } from './interface/authenticated-request.interface';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Req() req: AuthenticatedRequest,
    @Res() res: Response,
  ): Promise<Response> {
    const token = await this.authService.login(req.user);
    return res
      .header('Authorization', 'Bearer ' + token.access_token)
      .json(token)
      .send();
  }

  @UseGuards(JwtAuthGuard)
  @Post('loginout')
  async loginout(@Req() req: AuthenticatedRequest): Promise<any> {
    const result = await this.authService.loginout(req.user);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  me(@Req() req: AuthenticatedRequest) {
    return req.user;
  }
}
