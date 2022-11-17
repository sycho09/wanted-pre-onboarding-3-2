import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import axios from 'axios';
import styled from 'styled-components';
import MainLayout from '@components/MainLayout';
import { User } from '@utils/types';

type UserProp = {
  data: User;
};

const User: NextPage<UserProp> = ({ data }) => {
  const [info, setInfo] = useState({
    name: '',
    age: '',
    phone_number: '',
  });

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/user?id=${id}`
        );
        setInfo(data[0]);
        console.log(data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <MainLayout>
      {info && (
        <StyledGrid>
          <StyledContent>
            <span>{info.name}</span>
            <span>{info.age}</span>
            <span>{info.phone_number}</span>
          </StyledContent>
        </StyledGrid>
      )}
    </MainLayout>
  );
};

export default User;

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const id = params;

//   const data = await axios.get(`http://localhost:3000/api/user?id=${id}`);
//   console.log(data);
//   return {
//     props: {
//       data,
//     },
//     // resolvedUrl: '/null',
//     // revalidate: 60 * 60 * 24  every 24 hours
//   };
// };

// export async function getStaticPaths() {
//   const data = await axios.get(`http://localhost:3000/api/users`);
//   const paths = data.data.map((item: IUser) => ({
//     params: { id: item.id.toString() },
//   }));
//   console.log(paths);
//   return {
//     paths,
//     fallback: 'blocking',
//   };
// }

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2;
  font-size: 0.85rem;
  line-height: 1.5;
`;

const StyledContent = styled.div`
  padding: 1rem;
`;
