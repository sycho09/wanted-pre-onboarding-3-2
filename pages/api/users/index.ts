import type { NextApiRequest, NextApiResponse } from 'next';
import { UserService } from 'service/UserService';
import { API_URL } from '@utils/config';
import { User } from '@utils/types';
import { AxiosError } from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[]>
) {
  try {
    const UserInstance = new UserService(API_URL, {
      headers: {
        Authorization: `Bearer ${req.cookies.token}`,
      },
    });

    const response = await UserInstance.getUsers('/users');
    return res.status(200).json(response);
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.toJSON());
      return;
      //   throw new Error('Error', error);
    } else {
      console.log(error);
      return;
    }
  }
}
