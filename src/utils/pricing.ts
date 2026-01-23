export const getMrpPrice = (price?: number | string) => {
  const base = Number(price) || 0;
  const rawPrice = Math.round(base * 1.5);
  return Math.floor(rawPrice / 100) * 100 + 99;
};

export const getOffPercentage = (price?: number | string, mrp?: number) => {
  const sellingPrice = Number(price) || 0;
  const mrpPrice = mrp ?? getMrpPrice(sellingPrice);

  if (mrpPrice <= 0) return 0;

  return Math.round(((mrpPrice - sellingPrice) / mrpPrice) * 100);
};
