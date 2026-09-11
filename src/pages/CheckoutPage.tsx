import React from "react";
import OrderSummary from "../components/cart/OrderSummary";
import Input from "../components/ui/Input";
import { useAppSelector } from "../lib/hooks/hooks";
import { useMutation } from "@tanstack/react-query";
import actions from "../api/actions/actions";
import { toast } from "sonner";
import Utils from "../utils";

type CheckoutFormValues = {
  customerFullName: string;
  customerPhone: string;
  customerEmail: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zipCode: string;
};

export default function CheckoutPage() {
  const { items } = useAppSelector((state) => state.cart);

  const [values, setValues] = React.useState<CheckoutFormValues>({
    customerFullName: "",
    customerPhone: "",
    customerEmail: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const total = React.useMemo(() => {
    return (
      items
        ?.map((item) => {
          const quantity = item?.quantity ?? 0;
          const price = item?.item?.price ?? 0;

          return quantity * price;
        })
        .reduce((previousValue, currentValue) => {
          return previousValue + currentValue;
        }, 0) ?? 0
    );
  }, [items]);

  const handleChange = (field: keyof CheckoutFormValues, value: string) => {
    setValues((previousValues) => ({
      ...previousValues,
      [field]: value,
    }));
  };

  const makeOrderMutation = useMutation({
    mutationKey: ["make-order"],
    mutationFn: async (data: unknown) => await actions.makeOrder(data),
  });
  const makePaymentMutation = useMutation({
    mutationKey: ["make-payment"],
    mutationFn: async (data: unknown) => await actions.makePayment(data),
  });
  const handleContinueToPayment = async () => {
    const payload = {
      orderId: `ORD-${Date.now()}`,

      customerEmail: values.customerEmail,
      customerFullName: values.customerFullName,
      customerPhone: values.customerPhone,

      totalAmount: total,

      items: items.map((cartItem) => ({
        item: cartItem.item._id,
        quantity: cartItem.quantity,
      })),

      shippingAddress: {
        address: values.address,
        apartment: values.apartment || undefined,
        city: values.city,
        state: values.state,
        zipCode: values.zipCode,
      },
    };

    if (
      !values.address ||
      !values.city ||
      !values.customerPhone ||
      !values.customerFullName
    ) {
      toast.error("Enter the missing information");

      return;
    }

    try {
      const {
        error,
        message,
        data: order,
      } = await makeOrderMutation.mutateAsync(payload);
      Utils.notify(error, message, async () => {
        try {
          const { error, message, data } =
            await makePaymentMutation.mutateAsync({
              ...payload,
              order: order?._id,
              currency: "UGX",
              amount: total,
              description: "Payment due to my ecommerce products",
              billing_address: {
                email_address: payload.customerEmail,
                phone_number: payload.customerPhone,
              },
            });

          Utils.notify(error, message, () => {
            if (data) {
              window.location.href = data?.redirect_url!;
            } else {
              Utils.notify("Failed to initiate payment");
            }
          });
        } catch (error) {
          Utils.notify("Network error: Payment");
        }
      });
    } catch (error) {
      Utils.notify("Network error");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mt-1 text-3xl font-black">Checkout</h1>
      <div className="mt-9 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="rounded-2xl border border-gray-100 p-5 sm:p-7">
          <h2 className="text-xl font-black">Shipping information</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold">
              Full name
              <Input
                className="mt-2"
                value={values.customerFullName}
                onChange={(event) =>
                  handleChange("customerFullName", event.target.value)
                }
                placeholder="Enter full name"
              />
            </label>

            <label className="text-sm font-semibold">
              Phone
              <Input
                className="mt-2"
                type="tel"
                value={values.customerPhone}
                onChange={(event) =>
                  handleChange("customerPhone", event.target.value)
                }
                placeholder="Enter phone number"
              />
            </label>

            <label className="text-sm font-semibold sm:col-span-2">
              Email
              <Input
                className="mt-2"
                type="email"
                value={values.customerEmail}
                onChange={(event) =>
                  handleChange("customerEmail", event.target.value)
                }
                placeholder="Enter email address"
              />
            </label>

            <label className="text-sm font-semibold sm:col-span-2">
              Address
              <Input
                className="mt-2"
                value={values.address}
                onChange={(event) =>
                  handleChange("address", event.target.value)
                }
                placeholder="Enter address"
              />
            </label>

            <label className="text-sm font-semibold sm:col-span-2">
              Apartment, suite, etc.{" "}
              <span className="font-normal text-gray-400">(optional)</span>
              <Input
                className="mt-2"
                value={values.apartment}
                onChange={(event) =>
                  handleChange("apartment", event.target.value)
                }
                placeholder="Apartment, suite, etc."
              />
            </label>

            <label className="text-sm font-semibold">
              City
              <Input
                className="mt-2"
                value={values.city}
                onChange={(event) => handleChange("city", event.target.value)}
                placeholder="Enter city"
              />
            </label>

            <label className="text-sm font-semibold">
              State
              <Input
                className="mt-2"
                value={values.state}
                onChange={(event) => handleChange("state", event.target.value)}
                placeholder="Enter state"
              />
            </label>

            <label className="text-sm font-semibold">
              ZIP code
              <Input
                className="mt-2"
                value={values.zipCode}
                onChange={(event) =>
                  handleChange("zipCode", event.target.value)
                }
                placeholder="Enter ZIP code"
              />
            </label>
          </div>
        </div>

        <OrderSummary
          buttonLabel="Continue to payment"
          estimatedTax={0}
          subTotal={total}
          handleClick={handleContinueToPayment}
          isLoading={
            makeOrderMutation.isPending || makePaymentMutation.isPending
          }
        />
      </div>
    </div>
  );
}
