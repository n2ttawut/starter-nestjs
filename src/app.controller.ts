import { Body, Controller, Get, Param, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { find } from 'lodash';
const user = require('../data/user.json');
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('partner/')
  getMenber(@Body() ids) {
    for (const key in ids) {
      let accOwner = find(user.account, { id: Number(key.replace('\x00', '')) })
      let accPastner = find(user.data, { client_account: Number(key.replace('\x00', '')) })
      if (accOwner || accPastner ) {
        return 1;
      }
      else{
        return this.appService.getMenber(key.replace('\x00', ''));
      }
    }
  }
}
