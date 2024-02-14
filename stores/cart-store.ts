import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ProductProps } from "@/utils/data/products";

import * as cartInMemory from "./helpers/cart-in-memory";

export type ProductCartProps = ProductProps & {
  quantity: number;
};

type StateProps = {
  products: ProductCartProps[];
  add: (product: ProductProps) => void;
  removeItem: (productId: string) => void;
  removeOneQuantity: (productId: string) => void;
  clear: () => void;
};

//<Type>
export const useCartStore = create(
  persist<StateProps>(
    (set) => ({
      products: [],
      add: (product: ProductProps) =>
        set((state) => ({
          //.set is a zustand method to update the state
          products: cartInMemory.add(state.products, product), //get the products of the state, and add the new product
        })),
      removeItem: (productId: string) =>
        set((state) => ({
          products: cartInMemory.removeItem(state.products, productId),
        })),
      removeOneQuantity: (productId: string) =>
        set((state) => ({
          products: cartInMemory.removeOneQuantity(state.products, productId),
        })),
      clear: () =>
        set(() => ({
          products: []
        })),
    }),
    {
      name: "eatly:cart",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
