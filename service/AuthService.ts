import { AxiosRequestConfig } from 'axios';
import HttpClient from 'api/apis';
import { Auth } from '@utils/types';

export class AuthService extends HttpClient {
  constructor(baseURL: string, config?: AxiosRequestConfig) {
    super(baseURL, config);
  }

  async login(url: string, login: Auth) {
    const response = await this.instance.post(url, login);
    return response;
  }
}
