import { Body, Controller, Get, HttpException, HttpStatus, Inject, OnModuleInit, Post, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { SigninUserDto } from '@app/shared/lib/dto/signin-user.dto';
import { User } from '@app/shared/lib/entities';
import { ClientKafka } from '@nestjs/microservices';
@Controller()
export class AppController implements OnModuleInit {
  constructor(
    private readonly appService: AppService,
    @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientKafka,
  ) { }

  onModuleInit() {
    this.authServiceClient.subscribeToResponseOf('register');
    this.authServiceClient.subscribeToResponseOf('signIn');
    this.authServiceClient.subscribeToResponseOf('authenticateUser');
    this.authServiceClient.subscribeToResponseOf('create_user');

    this.authServiceClient.connect();
  }

  @Post('register')
  async register(@Body() userdto: User) {
    try {
      return this.appService.register(userdto);
    } catch (error) {
      throw error;
    }
  }

  @Post('signin')
  async signIn(@Body() userdto: SigninUserDto): Promise<any> {
    try {
      let token = await this.appService.signIn(userdto);
      return token;
    } catch (error) {
      throw error;
    }
  }

  @Post('video')
  async video(@Body() video: any, @Request() request): Promise<any> {
    // check if user is authenticated
    let user = await this.appService.authenticateUser(request['headers']['authorization']);
    if (user == null) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    // process video
    let res = this.appService.processVideo(video);
    return res;
  }
}
