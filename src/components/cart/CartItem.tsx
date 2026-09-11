import { Minus, Plus, Trash2 } from "lucide-react";
import { money } from "../../lib";
import { Product } from "../../types";
import { useAppDispatch } from "../../lib/hooks/hooks";
import { incrementOrDecrement } from "../../lib/slices/cartSlice";

export default function CartItem({
  product,
  qty = 1,
  onRemove,
}: {
  product: Product;
  qty?: number;
  onRemove?: () => void;
}) {
  const dispatch = useAppDispatch();

  return (
    <div className="flex gap-4 border-b border-gray-100 py-5 last:border-0">
      <img
        src={product?.images?.at(0)}
        alt={product?.name}
        className="h-24 w-24 rounded-xl object-cover sm:h-28 sm:w-28"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-bold text-gray-900">{product?.name}</h3>
            <p className="mt-1 text-sm text-gray-400">
              {product?.category?.name}
            </p>
          </div>
          <button
            onClick={onRemove}
            className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-500"
          >
            <Trash2 size={17} />
          </button>
        </div>
        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center rounded-xl border border-gray-200">
            <button
              className="p-2 text-gray-500"
              onClick={() => {
                dispatch(
                  incrementOrDecrement({
                    item: {
                      item: product,
                    },
                    operation: "decr",
                  }),
                );
              }}
            >
              <Minus size={14} />
            </button>
            <span className="min-w-8 text-center text-sm font-semibold">
              {qty}
            </span>
            <button
              className="p-2 text-gray-500"
              onClick={() => {
                dispatch(
                  incrementOrDecrement({
                    operation: "incr",
                    item: {
                      item: product,
                    },
                  }),
                );
              }}
            >
              <Plus size={14} />
            </button>
          </div>
          <div className="font-black">{money(product?.price * qty)}</div>
        </div>
      </div>
    </div>
  );
}
