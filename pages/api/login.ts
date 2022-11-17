import { API_URL } from '@utils/config';
import { AxiosError } from 'axios';
import { AuthService } from 'feature/Login/AuthService';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const login = req.body;
    const AuthInstance = new AuthService(API_URL);

    const response = await AuthInstance.login('/login', login);

    const { accessToken } = response.data;

    res.setHeader(
      'Set-Cookie',
      `token=${accessToken}; path=/; HttpOnly; Max-Age=${60 * 60};`
    );

    if (res.status(200)) {
      return res.status(200).json(response.data);
    }
    if (!res.status(200)) {
      return res.json(response.status);
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    } else {
      console.log('error', error);
    }
  }
}
