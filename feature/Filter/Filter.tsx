import React from 'react';
import styled from 'styled-components';
import useDropDown from './useDropDown';
import { Brokers, BrokerIds } from '@utils/brokerNameConverter';

type FilterProps = {
  list: any[];
};
export default function Filter() {
  const { ref, isToggled, selectedItem, handleToggle, handleSelectedItem } =
    useDropDown();

  return (
    <div className="dropdown">
      <SelectButton onClick={handleToggle}>
        {selectedItem}
        <span>{!isToggled ? '▼' : '▲'}</span>
      </SelectButton>
      {isToggled && (
        <SelectBox ref={ref}>
          {Object.entries(Brokers).map(([key, value]) => (
            <ItemButton key={key} onClick={() => handleSelectedItem(key)}>
              {[value]}
            </ItemButton>
          ))}
        </SelectBox>
      )}
    </div>
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
