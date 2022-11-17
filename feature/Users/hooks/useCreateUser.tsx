import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { Auth } from '@utils/types';
import axios from 'axios';

export default function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation(
    async (info: Auth) => await axios.post('/api/user', info),
    {
      onSuccess: (data) => {
        console.log('inside useAddUser', data);
        alert('새로운 유저가 생성되었습니다.');
        queryClient.invalidateQueries(['users']);
      },
    }
  );
}
