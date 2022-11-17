import React from 'react';
import MainLayout from '@components/MainLayout';
import { User } from '@utils/types';
import useGetUsers from 'feature/Users/hooks/useGetUsers';
import styled from 'styled-components';
import Form from 'feature/Form/Form';
import UserItem from 'feature/Users/UserItem';

export default function Users() {
  const { isLoading, error, data } = useGetUsers();

  if (error) {
    return <p>에러 발생</p>;
  }

  if (isLoading) {
    return <p>로딩중입니다</p>;
  }

  return (
    <MainLayout breadcrumb="사용자목록">
      <Form />

      <StyledGrid>
        {data?.data.map((item: User) => (
          <StyledCell key={`${item.uuid}+${item.id}`}>
            <UserItem user={item} />
          </StyledCell>
        ))}
      </StyledGrid>
    </MainLayout>
  );
}

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4;
  font-size: 0.85rem;
  line-height: 1.5;
`;
const StyledCell = styled.div`
  display: flex;
  /* justify-content: space-between; */
`;
