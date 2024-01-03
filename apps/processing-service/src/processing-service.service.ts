import { Injectable } from '@nestjs/common';
import * as ffmpeg from 'fluent-ffmpeg'


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

  convert(input: string, output: string, callback: (data: any) => void) {
    var command = ffmpeg(input).format('mp4');
    command
      .clone()
      .save(output)
      .on('end', () => {
        console.log("stored successfully");

      })
      .catch((err: any) => {
        console.log('Error', err);
      });

    // ffmpeg(input)
    //   .output(output)
    //   .on('end', function () {
    //     console.log('conversion ended');
    //     callback(null);
    //   }).on('error', function (err: any) {
    //     console.log('error: ', err);
    //     callback(err);
    //   }).run();
  }
}
