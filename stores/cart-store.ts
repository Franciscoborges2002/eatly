import { ProductProps } from '@/utils/data/products';
import { create } from 'zustand';
import * as cartInMemory from "./helpers/cart-in-memory";

export type ProductCartProps = ProductProps & {
    quantity: number
}

type StateProps = {
    products: ProductCartProps[]
    add: (product: ProductProps) => void
}

//<Type>
export const useCartStore = create<StateProps>((set) => ({
    products: [],
    add: (product: ProductProps) => set((state) => ({//.set is a zustand method to updat ethe state
        products: cartInMemory.add(state.products, product),//get the products of the state, and add the new product
    })),
}))