module.exports = {
  formatCurrency({ value, currency }) {
    const formatter = new Intl.NumberFormat("en-US", {
      currency,
    });
    return formatter.format(value);
  },
};
