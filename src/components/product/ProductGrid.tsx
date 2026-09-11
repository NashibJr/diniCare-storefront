import { toast } from "sonner";
import { useAppDispatch } from "../../lib/hooks/hooks";
import { addOrRemoveItems } from "../../lib/slices/cartSlice";
import { Product } from "../../types";
import ProductCard from "./ProductCard";

type ProductTypes = {
  products: Product[];
};

export default function ProductGrid({ products }: ProductTypes) {
  const dispatch = useAppDispatch();

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          onAdd={() => {
            dispatch(
              addOrRemoveItems({
                operation: "add",
                item: {
                  item: product,
                  quantity: 1,
                },
              }),
            );

            toast.success("Item successfully added to cart");
          }}
        />
      ))}
    </div>
  );
}
