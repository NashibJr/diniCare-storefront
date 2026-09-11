import { Check, PackageCheck, Truck } from "lucide-react";
import { products } from "../data/products";
import { money } from "../lib";
import PageHero from "../components/common/PageHero";

export default function OrderDetailsPage() {
  return (
    <>
      <PageHero
        title="Order #SH12345678"
        subtitle="Placed April 20, 2026 · Delivered"
      />
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-100 p-5">
              <h2 className="font-black">Delivery progress</h2>
              <div className="mt-6 grid grid-cols-3 text-center text-xs font-semibold text-gray-500">
                <div>
                  <div className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-emerald-500 text-white">
                    <Check size={18} />
                  </div>
                  <div className="mt-2">Confirmed</div>
                </div>
                <div>
                  <div className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-emerald-500 text-white">
                    <Truck size={18} />
                  </div>
                  <div className="mt-2">Shipped</div>
                </div>
                <div>
                  <div className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-emerald-500 text-white">
                    <PackageCheck size={18} />
                  </div>
                  <div className="mt-2">Delivered</div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-gray-100 p-5">
              <h2 className="font-black">Items</h2>
              <div className="mt-4 grid gap-4">
                {products.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <div className="font-bold">{item.name}</div>
                      <div className="text-xs text-gray-400">Qty 1</div>
                    </div>
                    <div className="font-black">{money(item.price)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <aside className="space-y-5">
            <div className="rounded-2xl border border-gray-100 p-5">
              <h3 className="font-black">Shipping address</h3>
              <p className="mt-3 text-sm leading-6 text-gray-500">
                John Doe
                <br />
                123 Main St
                <br />
                New York, NY 10001
              </p>
            </div>
            <div className="rounded-2xl border border-gray-100 p-5">
              <h3 className="font-black">Order total</h3>
              <div className="mt-4 flex justify-between">
                <span className="text-gray-500">Total</span>
                <span className="text-xl font-black">$2,464</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
