import PageHero from "../components/common/PageHero";
import Badge from "../components/ui/Badge";
import { useQuery } from "@tanstack/react-query";
import { CustomerAccount } from "../types";
import actions from "../api/actions/actions";
import Suspense from "../components/common/Suspense";
import { money } from "../lib";
import { format } from "date-fns";

export default function OrdersPage() {
  const session = JSON.parse(
    localStorage.getItem("session") ?? "",
  ) as CustomerAccount;

  const { data, isLoading } = useQuery({
    queryKey: ["get-my-orders", session?._id],
    queryFn: async () => {
      const resp = await actions.getUserOrders(session?._id);

      return Array.isArray(resp.data) ? resp?.data : [];
    },
  });

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
          <Suspense isLoading={isLoading}>
            {data?.map((order) => (
              <div
                key={order._id}
                className="grid gap-3 border-b border-gray-100 px-5 py-5 last:border-0 md:grid-cols-[1fr_1fr_1fr_1fr_auto] md:items-center md:gap-4"
              >
                <div className="font-black">#{order?.orderId}</div>
                <div className="text-sm text-gray-500">
                  {format(order?.createdAt ?? new Date(), "MMM dd, yyyy")}
                </div>
                <div>
                  <Badge
                    className={
                      order?.status === "Delivered"
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
                  {money(order?.totalAmount ?? 0)}
                </div>
              </div>
            ))}
          </Suspense>
        </div>
      </div>
    </>
  );
}
