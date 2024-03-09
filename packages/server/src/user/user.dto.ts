import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { RoleType } from '../shared/enum/role-type.enum';

export class UserDto {
  readonly id: string;
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly name?: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly roles?: RoleType[];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export class RegisterDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  //@Matches(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i)
  readonly email: string;

  @IsNotEmpty()
  @MinLength(8, { message: ' The min length of password is 8 ' })
  @MaxLength(20, {
    message: " The password can't accept more than 20 characters ",
  })
  // @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,20}$/,
  //     { message: " A password at least contains one numeric digit, one supercase char and one lowercase char" }
  // )
  readonly password: string;
}
