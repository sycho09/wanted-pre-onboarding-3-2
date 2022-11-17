import { BrokerIds, BrokerNames } from '@utils/brokerNameConverter';
import { Account } from '@utils/types';
import { atom } from 'recoil';

export const FilterKeyword = atom<
  string | boolean | number | BrokerNames | BrokerIds
>({
  key: 'FilterKeyword',
  default: '',
});

export const FilteredList = atom({
  key: 'FilteredList',
  default: [],
});

export const AccountsLength = atom({
  key: 'AccountsLength',
  default: 0,
});

export const UserAddedList = atom<Account[]>({
  key: 'UserAddedList',
  default: [],
});

export const Username = atom<string>({
  key: 'Username',
  default: '',
});
