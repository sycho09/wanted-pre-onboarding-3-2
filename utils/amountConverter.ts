const amountConverter = (amount: string) => {
  return Math.round(Number(amount)).toLocaleString();
};

export default amountConverter;
