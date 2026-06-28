export function calculateMoney (priceCents) {
  return (Math.round(priceCents) / 100).toFixed(2);
}