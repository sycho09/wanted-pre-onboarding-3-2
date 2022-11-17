import { AxiosRequestConfig } from 'axios';
import HttpClient from 'api/apis';

export class AccountService extends HttpClient {
  constructor(baseURL: string, config?: AxiosRequestConfig) {
    super(baseURL, config);
  }

  async getTotalAccounts(url: string, config?: AxiosRequestConfig) {
    const response = await this.instance.get(url, { ...config });
    return response;
  }
}
