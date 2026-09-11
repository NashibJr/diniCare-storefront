import { toast } from "sonner";

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

  public static notify = (
    error?: string,
    message?: string,
    cb?: () => void,
  ) => {
    if (error) {
      toast.error(error ?? "Something went wrong");
    } else {
      toast.success(message);
      cb?.();
    }
  };
}
