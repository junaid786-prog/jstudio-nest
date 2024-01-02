import { Controller, HttpException, HttpStatus } from '@nestjs/common';
import { AuthServiceService } from './auth-service.service';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { SigninUserDto } from '@app/shared/lib/dto/signin-user.dto';

@Controller()
export class AuthServiceController {
  constructor(private readonly authServiceService: AuthServiceService) { }

  @MessagePattern('signIn')
  async signIn(signinUserdto: SigninUserDto): Promise<any> {
    try {
      let token = await this.authServiceService.signIn(signinUserdto);
      if (token == null) {
        throw new RpcException("Invalid username or password");
      }

      return token;
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern('authenticateUser')
  async authenticateUser(token: string): Promise<any> {
    try {
      let user = await this.authServiceService.authenticateUser(token);
      if (user == null) {
        throw new RpcException("Invalid token");
      }

      return user;
    } catch (error) {
      throw error;
    }
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
