import { Product } from "./product";

export type Cart = {
  products: Product[];
};

// 加一个商品到购物车
export function addProduct(cart: Cart, product: Product): Cart {
  return { ...cart, products: [...cart.products, product] };
}

// 购物车中是否存在指定的商品
export function contains(cart: Cart, product: Product): boolean {
  return cart.products.some(({ id }) => id === product.id);
}
