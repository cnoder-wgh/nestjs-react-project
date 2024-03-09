import { RoleType } from '../../shared/enum/role-type.enum';

export interface UserPrincipal {
  readonly username: string;
  readonly id: number;
  readonly email: string;
  readonly roles?: RoleType[];
}
