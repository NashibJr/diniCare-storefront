import { Link } from "react-router-dom";
import { orders } from "../data/orders";
import PageHero from "../components/common/PageHero";
import Badge from "../components/ui/Badge";

export default function OrdersPage() {
  return (
    <>
      <PageHero
        title="My orders"
        subtitle="Track active deliveries and review your purchase history."
      />
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
          <div className="hidden grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4 border-b border-gray-100 bg-gray-50 px-5 py-3 text-xs font-bold uppercase tracking-wide text-gray-400 md:grid">
            <div>Order</div>
            <div>Date</div>
            <div>Status</div>
            <div>Amount</div>
            <div />
          </div>
          {orders.map((order) => (
            <div
              key={order.id}
              className="grid gap-3 border-b border-gray-100 px-5 py-5 last:border-0 md:grid-cols-[1fr_1fr_1fr_1fr_auto] md:items-center md:gap-4"
            >
              <div className="font-black">#{order.id}</div>
              <div className="text-sm text-gray-500">{order.date}</div>
              <div>
                <Badge
                  className={
                    order.status === "Delivered"
                      ? "bg-emerald-50 text-emerald-700"
                      : order.status === "Shipped"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-amber-50 text-amber-700"
                  }
                >
                  {order.status}
                </Badge>
              </div>
              <div className="text-sm font-bold">
                ${order.amount.toLocaleString()}
              </div>
              <Link
                to={`/orders/${order.id}`}
                className="text-sm font-bold text-primary-500"
              >
                View details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
