import { currentDatetime } from "../lib/datetime";
import { totalPrice } from "./product";
import { Cart } from "./cart";
import { User } from "./user";

export type OrderStatus = "new" | "delivery" | "completed";

export type Order = {
  user: UniqueId;
  cart: Cart;
  created: DateTimeString;
  status: OrderStatus;
  total: PriceCents;
};


// 创建订单是系统做的事情，而不是用户做的事情，所以放在domain
export function createOrder(user: User, cart: Cart): Order {
  return {
    cart,
    user: user.id,
    status: "new",
    created: currentDatetime(),
    total: totalPrice(cart.products),
  };
}


// 这个应该算做是架构设计
// 软件设计