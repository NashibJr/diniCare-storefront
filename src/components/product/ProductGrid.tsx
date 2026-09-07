import type { Product } from "../../types";
import ProductCard from "./ProductCard";

export default function ProductGrid({products,onAdd}:{products:Product[];onAdd?:(product:Product)=>void}){return <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{products.map(product=><ProductCard key={product.id} product={product} onAdd={onAdd}/>)}</div>}
