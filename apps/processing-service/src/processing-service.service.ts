import { Injectable } from '@nestjs/common';

@Injectable()
export class ProcessingServiceService {
  async processVideo(video: any): Promise<any> {
    try {
      return {
        status: 'success',
        message: 'Video processed successfully',
        data: video
      };
    } catch (error) {
      throw error;
    }
  }
}
