import { AccountStatusNumber } from './AccountStatusConverter';
import { BrokerIds } from './brokerNameConverter';

export type Auth = {
  email: string;
  password: string;
  name?: string;
};

export type AuthResponse = {
  accessToken: string;
  user: Auth;
};

export type Account = {
  id: number;
  user_id: number;
  uuid: string;
  broker_id: BrokerIds | string;
  status: AccountStatusNumber;
  number: string;
  name: string;
  assets: string;
  payments: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  user_name?: string;
};

export type User = {
  id: number;
  uuid: string;
  photo: string;
  name: string;
  email: string;
  age: number;
  gender_origin: number;
  birth_date: string;
  phone_number: string;
  address: string;
  detail_address: string;
  last_login: string;
  created_at: string;
  updated_at: string;
};

export type UserSetting = {
  id: number;
  uuid: string;
  allow_marketing_push: boolean;
  allow_invest_push: boolean;
  is_active: boolean;
  is_staff: boolean;
  created_at: string;
  updated_at: string;
};
