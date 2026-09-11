import { Product } from "../../types";
import ProductCard from "./ProductCard";

type ProductTypes = {
  products: Product[];
  onAdd?: (product: Product) => void;
};

export default function ProductGrid({ products, onAdd }: ProductTypes) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} onAdd={onAdd} />
      ))}
    </div>
  );
}
