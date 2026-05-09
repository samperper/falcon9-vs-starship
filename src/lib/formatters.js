export const compactUsd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 1,
  notation: 'compact',
});

export const wholeUsd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export const wholeNumber = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0,
});

export const compactNumber = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 1,
  notation: 'compact',
});

export const percent = new Intl.NumberFormat('en-US', {
  style: 'percent',
  maximumFractionDigits: 1,
});

export const formatMoney = (value) => compactUsd.format(value);

export const formatMoneyFull = (value) => wholeUsd.format(value);

export const formatCostPerKg = (value) => `${wholeUsd.format(value)}/kg`;

export const formatPercent = (value) => percent.format(value);

export const formatInputValue = (value, unit) => {
  if (unit === 'USD') {
    return compactUsd.format(value);
  }

  if (unit === 'USD/kg') {
    return formatCostPerKg(value);
  }

  if (unit === 'kg') {
    return `${compactNumber.format(value)} kg`;
  }

  if (unit === 'flights') {
    return `${wholeNumber.format(value)} flights`;
  }

  return wholeNumber.format(value);
};

export const toMillions = (value) => value / 1_000_000;
