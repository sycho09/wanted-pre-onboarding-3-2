import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { Auth } from '@utils/types';
import axios from 'axios';

export default function useUpdateUser(newName: Auth) {
  const queryClient = useQueryClient();

  return useMutation(
    async (id: number) => await axios.put(`/api/user/${id}`, newName),
    {
      onSuccess: (data) => {
        alert('이름 변경 성공');
        queryClient.invalidateQueries(['users']);
      },
    }
  );
}
