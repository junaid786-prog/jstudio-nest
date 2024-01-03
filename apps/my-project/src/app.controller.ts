import { Body, Controller, Get, HttpException, HttpStatus, Post, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { SigninUserDto } from '@app/shared/lib/dto/signin-user.dto';
import { User } from '@app/shared/lib/entities';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('register')
  async register(@Body() userdto: User): Promise<any> {
    try {
      let user = await this.appService.register(userdto);
      return user;
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
