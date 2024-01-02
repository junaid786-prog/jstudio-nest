import { Controller, Get } from '@nestjs/common';
import { ProcessingServiceService } from './processing-service.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class ProcessingServiceController {
  constructor(private readonly processingServiceService: ProcessingServiceService) {}

  @MessagePattern('process_video')
  async processVideo(video: any): Promise<any> {
    try {
      let result = await this.processingServiceService.processVideo(video);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
