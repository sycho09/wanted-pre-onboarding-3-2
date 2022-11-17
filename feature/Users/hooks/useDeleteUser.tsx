import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export default function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation(
    async (id: number) => await axios.delete(`/api/user/${id}`),
    {
      onSuccess: (data) => queryClient.invalidateQueries(['users']),
    }
  );
}
