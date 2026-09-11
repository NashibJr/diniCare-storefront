import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types";

export type Item = {
  item: Product;
  quantity: number;
};

export type CartInitialState = {
  items: Item[];
};

type AddOrRemovePayloadAction = {
  operation?: "add" | "remove" | "incr" | "decr";
  item?: Item;
  quantity?: number;
};

const initialState = {
  items: [],
} as CartInitialState;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addOrRemoveItems: (
      state,
      action: PayloadAction<AddOrRemovePayloadAction>,
    ) => {
      const { operation, item } = action.payload;
      const exists = state.items?.find(
        (itm) => itm.item?._id === item?.item?._id,
      );

      switch (operation) {
        case "add":
          if (!exists) {
            state.items.push(item!);
          } else {
            exists.quantity = item!.quantity;
          }
          break;

        default:
          state.items = state?.items?.filter(
            (itm) => itm.item?._id !== item!.item?._id,
          );
          break;
      }
    },
    incrementOrDecrement: (
      state,
      action: PayloadAction<AddOrRemovePayloadAction>,
    ) => {
      const { operation, quantity, item } = action.payload;
      const existingItem = state?.items?.find(
        (itm) => itm.item?._id === item?.item?._id,
      );

      if (existingItem) {
        if (operation === "incr") {
          existingItem.quantity += quantity!;
        } else if (operation === "decr") {
          existingItem.quantity -= quantity!;
        }
      }
    },
    clearCart: (state) => {
      state = initialState;
    },
  },
});

export const { addOrRemoveItems, incrementOrDecrement, clearCart } =
  cartSlice.actions;

export default cartSlice;
