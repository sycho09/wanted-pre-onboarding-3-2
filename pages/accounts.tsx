/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  AccountsLength,
  FilterKeyword,
  UserAddedList,
} from 'feature/Filter/atom';
import MainLayout from '@components/MainLayout';
import {
  maskingNumber,
  amountConverter,
  brokerNameConverter,
  accountStatusConverter,
} from '@utils/index';
import { Account, User } from '@utils/types';
import { Pagination, Search, Filter } from 'feature';
import { useQueryList } from 'feature/Accounts/useQueryList';
import { NextPageWithLayout } from './_app';

const Accounts: NextPageWithLayout = () => {
  const [accountsList, setAccountsList] = useRecoilState(UserAddedList);
  const [finalPage, setFinalPage] = useState(1);

  const accountsLength = useSetRecoilState(AccountsLength);
  const filteKeyword = useRecoilValue(FilterKeyword);

  const {
    UsersData,
    AccountsData,
    refetch,
    isSuccess,
    isLoading,
    currentPage,
    setCurrentPage,
    query,
    setQuery,
  } = useQueryList();

  useEffect(() => {
    if (filteKeyword !== '') {
      refetch();
    }
  }, [filteKeyword]);

  const displayTotalAccounts = () => {
    const result = AccountsData?.data.data.map((account: Account) => {
      const findOne: User = UsersData?.data.find(
        (user: User) => account.user_id === user.id
      );
      return { ...account, user_name: findOne?.name };
    });
    setAccountsList(result);
  };

  useEffect(() => {
    refetch();
    console.log(AccountsData);
  }, [currentPage, query]);

  useEffect(() => {
    accountsLength(Number(AccountsData?.data.headers['x-total-count']));
    setFinalPage(Number(AccountsData?.data.headers['x-total-count']));
    if (AccountsData && isSuccess) {
      displayTotalAccounts();
    }
  }, [AccountsData, isSuccess]);

  if (isLoading) {
    return <p>로딩중입니다</p>;
  }

  return (
    <MainLayout breadcrumb=" 계좌목록">
      <StyledFilterBox>
        <Search setQuery={setQuery} />
        <Filter />
      </StyledFilterBox>
      {accountsList?.length > 0 && (
        <>
          <StyledGrid>
            {[
              '고객명',
              '브로커명',
              '계좌번호',
              '계좌상태',
              '계좌명',
              '평가금액',
              '입금금액',
              '계좌활성화여부',
              '계좌개설일',
            ].map((item) => (
              <p key={item}>
                <strong>{item}</strong>
              </p>
            ))}
          </StyledGrid>
          {accountsList?.map((item: Account) => (
            <StyledGrid key={`${item.uuid}+${item.id}`}>
              <Link href={`/user/${item.user_id}`}>{item.user_name}</Link>
              <span> {brokerNameConverter(item.broker_id)}</span>
              <span> {maskingNumber(item.number)}</span>
              <span> {accountStatusConverter(item.status)}</span>
              <span> {item.name}</span>
              <span> {amountConverter(item.assets)}</span>
              <span> {amountConverter(item.payments)}</span>
              <span> {item.is_active ? '활성' : '비활성'}</span>
              <span>{item.created_at?.split('T')[0]}</span>
            </StyledGrid>
          ))}
        </>
      )}
      <Pagination
        totalPage={Math.ceil(finalPage / 35)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </MainLayout>
  );
};
export default Accounts;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  font-size: 0.85rem;
  line-height: 1.5;
`;
const StyledFilterBox = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  font-size: 0.85rem;
  line-height: 1.5;
`;
