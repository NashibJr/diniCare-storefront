import { Heart, ShoppingBag, Star } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "../../types";
import { money } from "../../lib";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import Utils from "../../utils";

export default function ProductCard({
  product,
  onAdd,
}: {
  product: Product;
  onAdd?: (product: Product) => void;
}) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition hover:-translate-y-1 hover:shadow-soft">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
        <Link to={`/product/${product._id}`}>
          <img
            src={product?.images?.at(0)}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>
        {product?.status && (
          <Badge className="absolute left-3 top-3">{product?.status}</Badge>
        )}
        <button className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-gray-600 shadow-sm hover:text-primary-500">
          <Heart size={17} />
        </button>
      </div>
      <div className="p-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-gray-400">
          {product?.category?.name}
        </div>
        <Link
          to={`/product/${product?._id}`}
          className="mt-1 block font-bold text-gray-900 hover:text-primary-500"
        >
          {product.name}
        </Link>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center gap-1 text-sm font-semibold text-gray-800">
            <Star size={15} className="fill-secondary text-secondary" />
            {4}
          </div>
          <span className="text-xs text-gray-400">({10})</span>
        </div>
        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <span className="text-lg font-black text-gray-950">
              UGX {Utils.formatMoney(product?.price)}
            </span>

            <span className="ml-2 text-xs text-gray-400 line-through">
              {Utils.getDiscount(product?.price)}
            </span>
          </div>
          <Button
            size="sm"
            onClick={() => onAdd?.(product)}
            aria-label={`Add ${product?.name} to cart`}
          >
            <ShoppingBag size={16} />
          </Button>
        </div>
      </div>
    </article>
  );
}
