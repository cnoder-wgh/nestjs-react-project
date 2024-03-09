import { RoleType } from '../../shared/enum/role-type.enum';

export interface JwtPayload {
  readonly upn: string;
  readonly sub: number;
  readonly email: string;
  readonly roles: RoleType[];
}
