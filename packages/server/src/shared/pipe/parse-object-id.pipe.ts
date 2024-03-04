import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

/**
 * TODO: 改成mysql
 */
@Injectable()
export class ParseObjectIdPipe implements PipeTransform<string, string> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: string, metadata: ArgumentMetadata) {
    return value;
  }
}
