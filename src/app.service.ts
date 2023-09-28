import { Injectable } from '@nestjs/common';
const fs = require('fs');
const user = require('../data/user.json');
@Injectable()
export class AppService {
  static token = '';
  async getMenber(client_account) {
    const accNum = Number(client_account.trim())
    if (AppService.token !== '') {

      return this.getPartnerMumber(accNum);
    } else {
      return await this.login().then(async (x) =>
        this.getPartnerMumber(accNum)
      );
    }
  }
  login() {
    const axios = require('axios');
    const FormData = require('form-data');
    let data = new FormData();
    data.append('login', process.env.EMAIL_LOGIN);
    data.append('password', process.env.PASSWORD_LOGIN);
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: process.env.URL_AUTH,
      headers: {
        'Authorization': 'Bearer AIzaSyDOTWEzC_xndro-TULSzOfKncmlTonhH9I',
        ...data.getHeaders()
      },
      data: data
    };
    return axios.request(config)
      .then((response) => {
        AppService.token = response.data.token;
      })
      .catch((error) => {
        console.log(error);
      });

  }
  async getPartnerMumber(client_account) {

    const axios = require('axios');
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: process.env.URL_CLIENTS + '?client_account=' + client_account + '&&limit=1&offset=0&ordering=-trade_fn',
      headers: {
        'Authorization': 'JWT ' + AppService.token,
      }
    };
    const datasPartNer = await axios.request(config)
      .then((response) => {
        user.data.push(response.data.data[0]);

        const jsonString = JSON.stringify(user);
        fs.writeFileSync(__dirname + '/data/user.json', jsonString, err => {
          if (err) {
            console.log('Error writing file', err)
          } else {
            console.log('Successfully wrote file')
          }
        })
        return response.data.totals.count;
      })
      .catch((error) => {
        console.log(error);
      });
    return datasPartNer.toString();

  }
}
