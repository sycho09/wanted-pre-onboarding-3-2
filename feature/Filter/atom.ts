import { BrokerIds, BrokerNames } from '@utils/brokerNameConverter';
import { Account } from '@utils/types';
import { atom } from 'recoil';

export const FilterKeyword = atom<
  string | boolean | number | BrokerNames | BrokerIds
>({
  key: 'FilterKeyword',
  default: '',
});

export const AccountsLength = atom({
  key: 'AccountsLength',
  default: 0,
});

export const UserAddedList = atom<Account[]>({
  key: 'UserAddedList',
  default: [],
});

export const FilterItem = atom({
  key: 'FilterItem',
  default: {
    broker_id: '브로커명',
    status: '계좌상태',
    is_active: '활성화상태',
  },
});

export const FilterItemKey = atom({
  key: 'FilterItemKey',
  default: {
    broker_id: '',
    status: '',
    is_active: '',
  },
});
