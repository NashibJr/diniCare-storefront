import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Item = {
  item: string;
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
      const exists = state.items?.find((itm) => itm.item === item?.item);

      switch (operation) {
        case "add":
          if (!exists) {
            state.items.push(item!);
          } else {
            exists.quantity = item!.quantity;
          }
          break;

        default:
          state.items = state?.items?.filter((itm) => itm.item !== item!.item);
          break;
      }
    },
    incrementOrDecrement: (
      state,
      action: PayloadAction<AddOrRemovePayloadAction>,
    ) => {
      const { operation, quantity, item } = action.payload;
      const existingItem = state?.items?.find((itm) => itm.item === item?.item);

      if (existingItem) {
        if (operation === "incr") {
          existingItem.quantity += quantity!;
        } else if (operation === "decr") {
          existingItem.quantity -= quantity!;
        }
      }
    },
  },
});

export const { addOrRemoveItems, incrementOrDecrement } = cartSlice.actions;

export default cartSlice;
