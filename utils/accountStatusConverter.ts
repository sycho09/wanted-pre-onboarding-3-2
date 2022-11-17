export const AccountStatus = {
  관리자확인필요: 9999,
  입금대기: 1,
  운용중: 2,
  투자중지: 3,
  해지: 4,
} as const;

export type AccountStatusName = keyof typeof AccountStatus;
export type AccountStatusNumber = typeof AccountStatus[AccountStatusName];

const accountStatusConverter = (bstatus: AccountStatusNumber) => {
  for (const key in AccountStatus) {
    if (AccountStatus[key as AccountStatusName] === bstatus) {
      return key;
    }
  }
};

export default accountStatusConverter;
