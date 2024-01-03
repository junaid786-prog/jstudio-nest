import { Controller, Get } from '@nestjs/common';
import { ProcessingServiceService } from './processing-service.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class ProcessingServiceController {
  constructor(private readonly processingServiceService: ProcessingServiceService) { }

  @MessagePattern('process_video')
  async processVideo(video: any): Promise<any> {
    try {
      let result = await this.processingServiceService.processVideo(video);
      // this.processingServiceService.convert('./df.mp4', './output.mp3', function (err) {
      //   if (!err) {
      //     console.log('conversion complete');
      //     //...

      //   } else {
      //     console.log(err);
      //   }
      // });
      return result;
    } catch (error) {
      throw error;
    }
  }
}
