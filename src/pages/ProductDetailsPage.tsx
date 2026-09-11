import React from "react";
import { Minus, Plus, ShieldCheck, Star, Truck } from "lucide-react";
import { useParams } from "react-router-dom";
import Button from "../components/ui/Button";
import ProductGrid from "../components/product/ProductGrid";
import { useQuery } from "@tanstack/react-query";
import actions from "../api/actions/actions";
import Suspense from "../components/common/Suspense";
import Utils from "../utils";
import useProducts from "../lib/hooks/useProducts";
import ShouldRender from "../components/common/ShouldRender";

export type ParamTypes = {
  id: string;
};

export default function ProductDetailsPage() {
  const { id } = useParams<ParamTypes>();

  const [activeTab, setActiveTab] = React.useState<string>("desc");

  const handleTabChange = (value: string) => setActiveTab(value);

  const { data: product, isLoading } = useQuery({
    queryKey: ["get-product-details", id],
    queryFn: async () => await actions.getProductDetails(id!),
  });

  const { data: products, isLoading: productsLoading } = useProducts(
    1,
    6,
    product?.category?._id,
  );

  const { data: reviews, isLoading: reviewLoading } = useQuery({
    queryKey: ["get-reviews"],
    queryFn: async () => {
      const response = await actions.getReviews(1, 100, id);

      return Array.isArray(response.data) ? response.data : [];
    },
  });

  return (
    <Suspense isLoading={isLoading}>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-xs font-medium text-gray-400">
          Home / {product?.category?.name} / {product?.name}
        </div>
        <div className="mt-6 grid gap-9 lg:grid-cols-2">
          <div className="grid gap-3 sm:grid-cols-[88px_1fr]">
            <div className="order-2 flex gap-3 overflow-auto sm:order-1 sm:grid sm:content-start">
              {product?.images.map((item) => (
                <button
                  key={item}
                  className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50"
                >
                  <img
                    src={item}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
            <div className="order-1 overflow-hidden rounded-3xl bg-gray-50 sm:order-2">
              <img
                src={product?.images?.[0]}
                alt={product?.name}
                className="aspect-square h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="lg:py-6">
            <div className="text-sm font-bold uppercase tracking-wide text-primary-500">
              {product?.category?.name}
            </div>
            <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              {product?.name}
            </h1>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex items-center gap-1 font-semibold">
                <Star size={17} className="fill-secondary text-secondary" />4
              </div>
              <span className="text-sm text-gray-400">
                {reviews?.length ?? 0} reviews
              </span>
            </div>
            <div className="mt-6 flex items-end gap-3">
              <span className="text-3xl font-black text-primary-500">
                {Utils.formatMoney(product?.price ?? 0)}
              </span>
              <span className="pb-1 text-sm text-gray-400 line-through">
                {Utils.getDiscount(product?.price ?? 0)}
              </span>
            </div>
            <p className="mt-5 max-w-xl text-sm leading-7 text-gray-600">
              {product?.description}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <div className="flex h-12 items-center rounded-xl border border-gray-200">
                <button className="px-3">
                  <Minus size={16} />
                </button>
                <span className="min-w-8 text-center font-bold">1</span>
                <button className="px-3">
                  <Plus size={16} />
                </button>
              </div>
              <Button
                size="lg"
                className="min-w-48 flex-1"
                // onClick={() => setAdded(true)}
              >
                Add to cart
              </Button>
            </div>
            <div className="mt-7 grid gap-3 border-t border-gray-100 pt-6 sm:grid-cols-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Truck size={18} className="text-primary-500" />
                Free shipping
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <ShieldCheck size={18} className="text-primary-500" />1 year
                warranty
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-black text-primary-500">↺</span>Easy
                returns
              </div>
            </div>
          </div>
        </div>
        <div className="mt-14 border-t border-gray-100 pt-10">
          <div className="flex gap-6 overflow-auto border-b border-gray-100 text-sm font-bold">
            {[
              { label: "Description", value: "desc" },
              { label: "Reviews", value: "review" },
            ].flatMap((tab) => [
              <button
                key={tab.value}
                className={`border-b-2 ${activeTab === tab.value ? "border-primary-500 text-primary-500" : "text-gray-500"} px-2 pb-4`}
                onClick={() => handleTabChange(tab.value)}
              >
                {tab.value}
              </button>,
            ])}
          </div>
          <div className="mt-5">
            <ShouldRender shouldRender={activeTab === "desc"}>
              <p className="max-w-3xl py-6 text-sm leading-7 text-gray-600">
                {product?.description ?? "No description"}
              </p>
            </ShouldRender>
            <ShouldRender shouldRender={activeTab === "review"}>
              <Suspense isLoading={reviewLoading}>
                <div className="flex flex-col gap-4">
                  {reviews?.map((review) => (
                    <div key={review._id} className="flex gap-2">
                      <div className="rounded-full p-2 bg-blue-400 shrink-0 w-8 font-bold text-white h-8 text-sm flex justify-center items-center">
                        {review.customerName
                          .split(" ")
                          .map((name) => name.charAt(0))}
                      </div>
                      <div className="flex flex-col gap-1">
                        <h2 className="font-bold text-sm">
                          {review.customerName}
                        </h2>
                        <p className="text-xs text-gray-500 -mt-1">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Suspense>
            </ShouldRender>
          </div>
        </div>
        <div className="mt-10">
          <h2 className="text-2xl font-black">You may also like</h2>
          <Suspense isLoading={productsLoading}>
            <Suspense isLoading={reviewLoading}>
              <div className="mt-6">
                <ProductGrid products={products?.data ?? []} />
              </div>
            </Suspense>
          </Suspense>
        </div>
      </div>
    </Suspense>
  );
}
