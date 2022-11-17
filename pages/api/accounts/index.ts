import type { NextApiRequest, NextApiResponse } from 'next';
import { AccountService } from 'feature/Accounts/AccountService';
import { API_URL } from '@utils/config';
import { AxiosError } from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { _page, q } = req.query;
    const hasCookie = req.cookies;

    const AccountInstance = new AccountService(API_URL, {
      headers: {
        Authorization: `Bearer ${req.cookies.token}`,
      },
    });

    if (q) {
      const { headers, data } = await AccountInstance.getTotalAccounts(
        `/accounts?_limit=35&_page=${_page}&q=${q}`
      );
      return res.status(200).json({ headers, data, hasCookie });
    }

    if (!q) {
      const { headers, data } = await AccountInstance.getTotalAccounts(
        `/accounts?_limit=35&_page=${_page}`
      );
      return res.status(200).json({ headers, data, hasCookie });
    }

    // console.log(response);
    // console.log(response.headers.link?.split(',').pop());
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
