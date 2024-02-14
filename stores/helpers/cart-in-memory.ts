import { ProductProps } from "@/utils/data/products";
import { ProductCartProps } from "../cart-store";

export function add(products: ProductCartProps[], newProduct: ProductProps){
    const productExists = products.find(({ id }) => newProduct.id === id);

    if(productExists){
        return products.map((product) =>  product.id === productExists.id
        ? { ...product, quantity: product.quantity + 1}//If the product of the interation is the same of the existing one, add 1 to quantity
        : product);//If now, just return the product
    }

    return [...products, {... newProduct, quantity: 1 }];//return all the products, and the new one, if donest exists, start with 1
}