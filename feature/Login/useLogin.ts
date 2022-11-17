import axios from 'axios';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { Auth } from '@utils/types';

export default function useLogin() {
  const router = useRouter();
  return useMutation(
    async (login: Auth) => await axios.post('/api/login', login),
    {
      onSuccess: (data) => {
        router.push('/accounts');
      },
      onError: (error) => console.log('inside use login', error),
    }
  );
}
