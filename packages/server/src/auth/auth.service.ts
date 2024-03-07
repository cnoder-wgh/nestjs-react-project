import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AccessToken } from './interface/access-token.interface';
import { JwtPayload } from './interface/jwt-payload.interface';
import { UserPrincipal } from './interface/user-principal.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async validateUser(username, password): Promise<any> {
    return {};
  }

  // If `LocalStrateg#validateUser` return a `Observable`, the `request.user` is
  // bound to a `Observable<UserPrincipal>`, not a `UserPrincipal`.
  //
  // I would like use the current `Promise` for this case, thus it will get
  // a `UserPrincipal` here directly.
  //
  async login(user: UserPrincipal): Promise<AccessToken> {
    //console.log(user);
    const payload: JwtPayload = {
      upn: user.username, //upn is defined in Microprofile JWT spec, a human readable principal name.
      sub: user.id,
      email: user.email,
      roles: user.roles,
    };
    const token = await this.jwtService.signAsync(payload);
    return { access_token: token };
  }
}
