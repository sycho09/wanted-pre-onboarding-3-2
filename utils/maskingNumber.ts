const maskingNumber = (preMasking: string) => {
  if (preMasking !== undefined) {
    const maskingLength = preMasking?.length - 3;
    return preMasking.replace(
      new RegExp('.(?=.{2,' + maskingLength + '}$)', 'g'),
      '*'
    );
  }
};

export default maskingNumber;
