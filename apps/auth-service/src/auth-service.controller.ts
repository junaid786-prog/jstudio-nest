import { Controller, Get } from '@nestjs/common';
import { AuthServiceService } from './auth-service.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthServiceController {
  constructor(private readonly authServiceService: AuthServiceService) { }

  @Get("/")
  getHelloFun(): string {
    return "Helo from auth-service"
  }
  @Get("/foo")
  getFooFun(): string {
    return "foo from auth-service"
  }

  @MessagePattern('getHello')
  getHello(name: string): string {
    return this.authServiceService.getHello(name);
  }

  @MessagePattern('getFoo')
  getFoo(name: string): string {
    return "foo + " + name;
  }
}
