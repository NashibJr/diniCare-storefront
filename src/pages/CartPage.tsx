import React, { useState } from "react";
import CartItem from "../components/cart/CartItem";
import OrderSummary from "../components/cart/OrderSummary";
import Modal from "../components/ui/Modal";
import Button from "../components/ui/Button";
import { useAppDispatch, useAppSelector } from "../lib/hooks/hooks";
import ShouldRender from "../components/common/ShouldRender";
import { addOrRemoveItems, Item } from "../lib/slices/cartSlice";

export default function CartPage() {
  const { items } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const [remove, setRemove] = useState(false);
  const [selectedItem, setSelectedItem] = React.useState<Item | null>(null);

  const handleClose = () => {
    setRemove(false);
    setSelectedItem(null);
  };

  const handleRemove = () => {
    dispatch(
      addOrRemoveItems({
        operation: "remove",
        item: selectedItem!,
      }),
    );

    handleClose();
  };

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-sm font-bold text-primary-500">Your cart</div>
            <h1 className="mt-1 text-3xl font-black">Shopping cart</h1>
          </div>
          <button className="text-sm font-bold text-red-500">Clear cart</button>
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <ShouldRender shouldRender={items?.length !== 0}>
            <div className="rounded-2xl border border-gray-100 bg-white px-5 sm:px-6">
              {items?.flatMap((item) => [
                <CartItem
                  key={item?.item?._id}
                  product={item?.item}
                  qty={item?.quantity}
                  onRemove={() => {
                    setSelectedItem(item);
                    setRemove(true);
                  }}
                />,
              ])}
            </div>
          </ShouldRender>
          <ShouldRender shouldRender={items?.length === 0}>
            <p className="text-xs text-gray-400 mx-5 my-5">
              Your cart is empty
            </p>
          </ShouldRender>
          <div>
            <div className="mb-4">
              <label className="text-sm font-bold">Coupon code</label>
              <div className="mt-2 flex gap-2">
                <input
                  className="h-11 min-w-0 flex-1 rounded-xl border border-gray-200 px-3 text-sm outline-none focus:border-primary-400"
                  placeholder="SAVE10"
                />
                <Button variant="outline">Apply</Button>
              </div>
            </div>
            <OrderSummary />
          </div>
        </div>
      </div>
      <Modal open={remove} onOpenChange={handleClose} title="Remove item?">
        <p className="text-sm leading-6 text-gray-500">
          Are you sure you want to remove this item from your cart?
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleRemove}>
            Remove
          </Button>
        </div>
      </Modal>
    </>
  );
}
