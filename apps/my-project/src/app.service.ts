import { SigninUserDto } from '@app/shared/lib/dto/signin-user.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class AppService {

  constructor(
    @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy,
    @Inject('VIDEO_SERVICE') private readonly videoServiceClient: ClientProxy,
  ) {}

  public signIn(signinUserdto: SigninUserDto): Promise<any> {
    return this.authServiceClient.send<any, any>('signIn', signinUserdto).toPromise();
  }
  public authenticateUser(tokenStr: string): Promise<any> {
    if (tokenStr == null) {
      return null;
    }
    let token = tokenStr.split(' ')[1];
    console.log(token);
    
    return this.authServiceClient.send<any, any>('authenticateUser', token).toPromise();
  } 
  public processVideo(video: any): Promise<any> {
    return this.videoServiceClient.send<any, any>('process_video', video).toPromise();
  }
}
