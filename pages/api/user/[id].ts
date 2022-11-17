import { API_URL } from '@utils/config';
import { User } from '@utils/types';
import { AxiosError } from 'axios';
import { UserService } from 'feature/Users/UserService';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[]>
) {
  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      const UserInstance = new UserService(API_URL, {
        headers: {
          Authorization: `Bearer ${req.cookies.token}`,
        },
      });

      const response = await UserInstance.deleteUser(`/users/${id}`);
      return res.status(200).json(response);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.toJSON());
        return;
      } else {
        console.log(error);
        return;
      }
    }
  }
  if (req.method === 'PUT') {
    try {
      const { id } = req.query;
      const newName = req.body;

      const UserInstance = new UserService(API_URL, {
        headers: {
          Authorization: `Bearer ${req.cookies.token}`,
        },
      });

      const response = await UserInstance.updateUser(`/users/${id}`, newName);
      return res.status(200).json(response);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.toJSON());
        return;
      } else {
        console.log(error);
        return;
      }
    }
  }
}
