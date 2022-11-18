import type { NextApiRequest, NextApiResponse } from 'next';
import { AccountService } from 'service/AccountService';
import { API_URL } from '@utils/config';
import { AxiosError } from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { _page, q, broker_id, status, is_active } = req.query;
    const hasCookie = req.cookies;

    const AccountInstance = new AccountService(API_URL, {
      headers: {
        Authorization: `Bearer ${req.cookies.token}`,
      },
    });

    if (q) {
      const { headers, data } = await AccountInstance.getTotalAccounts(
        `/accounts?_limit=35&_page=${_page}&q=${q}` +
          (!!broker_id ? `&broker_id=${broker_id}` : '') +
          (!!status ? `&status=${status}` : '') +
          (is_active !== '' ? `&is_active=${is_active}` : '')
      );
      return res.status(200).json({ headers, data, hasCookie });
    }

    if (!q) {
      const endpoint =
        `/accounts?_limit=35&_page=${_page}` +
        (!!broker_id ? `&broker_id=${broker_id}` : '') +
        (!!status ? `&status=${status}` : '') +
        (!!is_active ? `&is_active=${is_active}` : '');
      console.log('account', endpoint);
      const { headers, data } = await AccountInstance.getTotalAccounts(
        endpoint
      );
      return res.status(200).json({ headers, data, hasCookie });
    }
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
