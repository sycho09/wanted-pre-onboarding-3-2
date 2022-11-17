import { useState } from 'react';
import { useQueries } from '@tanstack/react-query';
import axios from 'axios';

export const useQueryList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');

  const querylist = [
    { key: ['users'], fn: async () => await axios.get('/api/users') },
    {
      key: ['accounts'],
      fn: async () =>
        await axios.get(
          `/api/accounts?_limit=35&_page=${String(currentPage)}&q=${query}`
        ),
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
