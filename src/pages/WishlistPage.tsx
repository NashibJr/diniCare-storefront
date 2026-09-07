import ProductGrid from "../components/product/ProductGrid";
import PageHero from "../components/common/PageHero";
import { products } from "../data/products";

export default function WishlistPage(){return <><PageHero title="My wishlist" subtitle="Products you saved for later."/><div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"><ProductGrid products={products.slice(0,4)}/></div></>}
