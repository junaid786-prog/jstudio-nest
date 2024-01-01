import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    const val = await this.appService.getHello();
    return val;
  }

  @Get('foo')
  async getFoo(): Promise<string> {
    let a = await this.appService.getFoo();
    return a;
  }
}
