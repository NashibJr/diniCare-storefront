import { Link } from "react-router-dom";
import Button from "../ui/Button";
import { money } from "../../lib";

type OrderSummaryType = {
  buttonLabel?: string;
  to?: string;
  estimatedTax: number;
  subTotal: number;
};

export default function OrderSummary({
  buttonLabel = "Proceed to Checkout",
  to = "/checkout",
  estimatedTax = 0,
  subTotal,
}: OrderSummaryType) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-black">Order summary</h3>
      <div className="mt-5 grid gap-3 text-sm">
        <div className="flex justify-between text-gray-500">
          <span>Subtotal</span>
          <span className="font-semibold text-gray-900">
            {money(subTotal ?? 0)}
          </span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Shipping</span>
          <span className="font-semibold text-emerald-600">Free</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Estimated tax</span>
          <span className="font-semibold text-gray-900">
            {money(estimatedTax)}
          </span>
        </div>
      </div>
      <div className="my-5 border-t border-gray-100" />
      <div className="flex justify-between">
        <span className="font-bold">Total</span>
        <span className="text-xl font-black">{money(subTotal ?? 0)}</span>
      </div>
      <Link to={to} className="mt-5 block">
        <Button className="w-full">{buttonLabel}</Button>
      </Link>
      <p className="mt-3 text-center text-xs text-gray-400">
        Secure checkout · SSL encrypted
      </p>
    </div>
  );
}
