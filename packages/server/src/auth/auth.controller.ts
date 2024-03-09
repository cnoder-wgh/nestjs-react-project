import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthenticatedRequest } from './interface/authenticated-request.interface';

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
}
