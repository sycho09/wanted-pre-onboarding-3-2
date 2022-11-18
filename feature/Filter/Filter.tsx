import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useDropDown from './useDropDown';
import { Brokers } from '@utils/brokerNameConverter';
import { AccountStatus } from '@utils/accountStatusConverter';
import { useRecoilState } from 'recoil';
import { FilterItem, FilterItemKey } from './atom';
import { useQueryList } from 'feature/Accounts/useQueryList';

const ActiveStatus = { 활성: true, 비활성: false };

type FilterWordProps = {
  broker_id: string;
  status: any;
  is_active: any;
};

type FilterProps = {
  list: any[];
  type: any;
  // filtered: FilterWordProps;
  // setFiltered: React.Dispatch<React.SetStateAction<FilterWordProps>>;
  // filteredQuery: FilterWordProps;
  // setFilteredQuery: React.Dispatch<React.SetStateAction<FilterWordProps>>;
};

export default function FilterContainer() {
  return (
    <>
      {[
        { list: Object.entries(Brokers), type: 'broker_id' },
        { list: Object.entries(ActiveStatus), type: 'is_active' },
        { list: Object.entries(AccountStatus), type: 'status' },
      ].map(({ list, type }) => (
        <Filter
          key={type}
          type={type}
          list={list}
          // filtered={filtered}
          // setFiltered={setFiltered}
          // filteredQuery={filteredQuery}
          // setFilteredQuery={setFilteredQuery}
        />
      ))}
    </>
  );
}

function Filter({
  list,
  type,
}: // filtered,
// setFiltered,
// filteredQuery,
// setFilteredQuery,
FilterProps) {
  const { ref, isToggled, handleToggle, selectedItem, handleSelectedItem } =
    useDropDown();
  const { AccountsData, isLoading } = useQueryList();

  const [filtered, setFiltered] = useRecoilState(FilterItem);
  const [filteredQuery, setFilteredQuery] = useRecoilState(FilterItemKey);

  const handleFilterItem = (value: string | boolean | number, key: string) => {
    handleSelectedItem(value);
    if (type === 'broker_id') {
      setFilteredQuery({ ...filteredQuery, [type]: key });
      setFiltered({ ...filtered, [type]: value });
    }
    if (type !== 'broker_id') {
      setFilteredQuery({ ...filteredQuery, [type]: value });
      setFiltered({ ...filtered, [type]: key });
    }
  };

  if (isLoading) return <p>목록을 불러오고 있습니다.</p>;
  return (
    <>
      <div className="dropdown">
        <SelectButton onClick={handleToggle}>
          {filtered[type as keyof typeof filtered]}
          <span>{!isToggled ? '▼' : '▲'}</span>
        </SelectButton>
        {isToggled && (
          <SelectBox ref={ref}>
            {list.map(([key, value]) => (
              <ItemButton
                key={key}
                onClick={() => handleFilterItem(value, key)}
              >
                {list.length > 20 ? [value] : [key]}
              </ItemButton>
            ))}
          </SelectBox>
        )}
      </div>
    </>
  );
}

export const SelectButton = styled.button`
  width: 130px;
  display: flex;
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 5px;
  justify-content: space-between;
`;

export const SelectBox = styled.div`
  width: 130px;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50px;
  max-height: 10rem;
  overflow-y: auto;
  background-color: white;
`;

export const ItemButton = styled.button`
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  background: none;
  border: none;
  padding: 0.2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
  outline: none;
  cursor: pointer;
  :hover {
    background-color: ${({ theme }) => theme.colors.grey};
  }
`;
