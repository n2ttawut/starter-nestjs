import { Body, Controller, Get, Param, Req } from '@nestjs/common';
import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('partner/')
  getMenber(@Body() id) {

    for (const key in id) {

      return this.appService.getMenber(key.replaceAll('\x00', ''));
    }
  }
}
