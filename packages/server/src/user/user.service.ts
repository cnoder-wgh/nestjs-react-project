import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  constructor() {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findById(id: string, withPosts = false): Observable<any> {
    return null;
  }
}
