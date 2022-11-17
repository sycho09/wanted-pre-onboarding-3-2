import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export default function useGetUsers() {
  return useQuery(['users'], async () => await axios.get('/api/users'));
}
