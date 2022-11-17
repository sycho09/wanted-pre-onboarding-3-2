import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class HttpClient {
  protected readonly instance: AxiosInstance;

  public constructor(baseURL: string, config?: AxiosRequestConfig) {
    this.instance = axios.create({
      baseURL,
      ...config,
    });
  }
}

export default HttpClient;

// https://levelup.gitconnected.com/enhance-your-http-request-with-axios-and-typescript-f52a6c6c2c8e
