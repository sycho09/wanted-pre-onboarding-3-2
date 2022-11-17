import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
const sidebar = [
  { id: 1, name: '대시보드', keyword: '' },
  { id: 2, name: '계좌 목록', keyword: '/accounts' },
  { id: 3, name: '사용자 목록', keyword: '/users' },
  { id: 9999, name: '로그아웃', keyword: '' },
];
export default function Sidebar() {
  const router = useRouter();

  return (
    <StyledMenuBar>
      {sidebar.map((item) => (
        <Link key={item.id} href={`${item.keyword}`}>
          <StyleMenuTitle isSelected={router.pathname === item.keyword}>
            {item.name}
          </StyleMenuTitle>
        </Link>
      ))}
    </StyledMenuBar>
  );
}

const StyledMenuBar = styled.ul`
  width: 200px;
  margin: 0;
  padding: 0;
  min-height: 100vh;
  padding-top: 2rem;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const StyleMenuTitle = styled.li<{ isSelected: boolean }>`
  /* user-select: none; */
  display: flex;
  align-items: center;
  padding: 1rem 3rem 1rem 1.5rem;
  cursor: pointer;
  color: ${({ isSelected }) => (isSelected ? 'black' : 'white')};
  background-color: ${({ isSelected }) =>
    isSelected ? 'lightgray' : 'transparent'};

  svg:last-child {
    margin-left: auto;
    font-size: 1.5rem;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    opacity: 0.8;
  }
`;
