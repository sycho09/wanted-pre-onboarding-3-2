import { useState } from 'react';
import { useQueries } from '@tanstack/react-query';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { FilterItemKey } from 'feature/Filter/atom';

export const useQueryList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');

  const { broker_id, status, is_active } = useRecoilValue(FilterItemKey);

  const endpoint =
    `/api/accounts?_limit=35&_page=${String(currentPage)}&q=${query}` +
    (!!broker_id ? `&broker_id=${broker_id}` : '') +
    (!!status ? `&status=${status}` : '') +
    (is_active !== '' ? `&is_active=${is_active}` : '');
  // (!!is_active ? `&is_active=${is_active}` : '');

  const querylist = [
    { key: ['users'], fn: async () => await axios.get('/api/users') },
    {
      key: ['accounts'],
      fn: async () => await axios.get(endpoint),
    },
  ];

  const [
    { data: UsersData },
    { data: AccountsData, refetch, isSuccess, isLoading },
  ] = useQueries({
    queries: querylist.map((item) => {
      return {
        queryKey: item.key,
        queryFn: item.fn,
      };
    }),
  });

  return {
    UsersData,
    AccountsData,
    refetch,
    isSuccess,
    isLoading,
    currentPage,
    setCurrentPage,
    query,
    setQuery,
  };
};
