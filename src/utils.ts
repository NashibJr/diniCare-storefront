export default class Utils {
  public static formatMoney = (amount: number) =>
    amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
    });

  public static getDiscount = (
    amount: number,
    percentageDiscount: number = 10,
  ) => {
    const discount = (percentageDiscount / 100) * amount;

    return this.formatMoney(discount);
  };
}
