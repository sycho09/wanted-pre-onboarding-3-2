import { AxiosRequestConfig } from 'axios';
import HttpClient from 'api/apis';
import { Auth, User } from '@utils/types';

export class UserService extends HttpClient {
  constructor(baseURL: string, config?: AxiosRequestConfig) {
    super(baseURL, config);
  }

  async getUsers(url: string, config?: AxiosRequestConfig) {
    const { data } = await this.instance.get<User[]>(url, { ...config });
    return data;
  }

  async addUser(url: string, info: Auth) {
    const { data } = await this.instance.post(url, info);
    return data;
  }

  async updateUser(url: string, name: Auth) {
    const { data } = await this.instance.put(url, name);
    return data;
  }

  async deleteUser(url: string, config?: AxiosRequestConfig) {
    const { data } = await this.instance.delete(url, { ...config });
    return data;
  }
}
