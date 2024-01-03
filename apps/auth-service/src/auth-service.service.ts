import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SigninUserDto } from '@app/shared/lib/dto/signin-user.dto';
import { User } from '@app/shared/lib/entities';

@Injectable()
export class AuthServiceService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  getHello(name: string): string {
    return 'Hello World! ' + name + ' from auth-service';
  }

  async register(userdto: User): Promise<any> {
    const user = await this.usersService.findOne(userdto.username);
    if (user) {
      return null;
    }
    return await this.usersService.create(userdto);
  }

  async signIn(signinUserdto: SigninUserDto): Promise<any> {
    const user = await this.usersService.findOne(signinUserdto.username);
    console.log(user);
    
    if (user && user.password === signinUserdto.password) {
      const payload = { username: user.username, id: user.id };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
    return null;
  }

  async authenticateUser(token: string): Promise<any> {
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      if (decoded) {
        return await this.usersService.findOne(decoded.username);
      }
    } catch (error) {
      return null;
    }
  }
  async getUserById(userId: number): Promise<any> {
    return await this.usersService.findUserById(userId);
  }
}
