import React, { useState } from "react";
import { Search } from "lucide-react";
import ProductGrid from "../components/product/ProductGrid";
// import FiltersPanel from "../components/product/FiltersPanel";
import Input from "../components/ui/Input";
import useProducts from "../lib/hooks/useProducts";
import Suspense from "../components/common/Suspense";
// import Modal from "../components/ui/Modal";
// import Button from "../components/ui/Button";

export default function ShopPage() {
  const [added, setAdded] = useState(false);
  const [query, setQuery] = React.useState<string>("");

  const { data, isLoading } = useProducts();

  const filtered = React.useMemo(() => {
    if (!data?.data) {
      return [];
    }

    return data.data.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [data?.data, query]);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 border-b border-gray-100 pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-sm font-bold text-primary-500">
              DigniCare collection
            </div>
            <h1 className="mt-1 text-3xl font-black tracking-tight sm:text-4xl">
              Shop all products
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Showing {filtered.length} curated products
            </p>
          </div>
          {/* <div className="flex gap-2">
            <Button
              variant="outline"
              className="lg:hidden"
              onClick={() => setFilters(true)}
            >
              <Filter size={17} />
              Filters
            </Button>
            <button className="flex h-11 items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-sm font-semibold">
              <SlidersHorizontal size={16} />
              Popular
            </button>
          </div> */}
        </div>
        <div className="mt-6 flex max-w-xl items-center gap-2 rounded-xl bg-gray-50 px-3">
          <Search size={17} className="text-gray-400" />
          <Input
            className="border-0 bg-transparent px-0 focus:ring-0"
            placeholder="Search by product name"
            name="query"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        {/* <div className="mt-8 grid gap-7 lg:grid-cols-[240px_1fr]"> */}
        <Suspense isLoading={isLoading}>
          <div className="mt-8">
            {/* <div className="hidden lg:block">
            <FiltersPanel />
          </div> */}
            <ProductGrid products={filtered} />
          </div>
        </Suspense>
      </div>
      {/* <Modal open={filters} onOpenChange={setFilters} title="Filters">
        <FiltersPanel />
      </Modal> */}
      {/* <Modal open={added} onOpenChange={setAdded} title="Added to cart">
        <p className="text-sm text-gray-500">Product added successfully.</p>
        <Button className="mt-5 w-full" onClick={() => setAdded(false)}>
          Continue shopping
        </Button>
      </Modal> */}
    </>
  );
}
