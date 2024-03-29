import { Controller, HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { AuthServiceService } from './auth-service.service';
import { Client, ClientKafka, EventPattern, MessagePattern, Payload, RpcException, Transport } from '@nestjs/microservices';
import { SigninUserDto } from '@app/shared/lib/dto/signin-user.dto';
import { User } from '@app/shared/lib/entities';

@Controller()
export class AuthServiceController {
  
  constructor(
    private readonly authServiceService: AuthServiceService,
    //private readonly kafkaClient: ClientKafka,
    ) { }

  onModuleInit() {
    //this.kafkaClient.subscribeToResponseOf('create_user');
  }

  @MessagePattern('create_user')
  hndleUserCreated(@Payload(ValidationPipe) user: SigninUserDto) {
    console.log(user);
    return user;
    //this.authServiceService.create(user);
  }
  @MessagePattern('register')
  async register(userdto: User): Promise<any> {
    try {
      let user = await this.authServiceService.register(userdto);
      if (user == null) {
        throw new RpcException("User already exists");
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

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
