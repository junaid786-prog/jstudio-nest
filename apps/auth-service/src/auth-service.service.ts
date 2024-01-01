import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthServiceService {
  getHello(name: string): string {
    return 'Hello World! ' + name + ' from auth-service';
  }
}
