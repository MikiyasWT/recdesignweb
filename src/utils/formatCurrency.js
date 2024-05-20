export function formatCurrency(amount, currency) {
    if (!currency) {
      throw new Error('Currency code is required with currency style.');
    }
  
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  
    return formatter.format(amount);
  }