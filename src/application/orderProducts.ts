import { User } from "../domain/user";
import { Cart } from "../domain/cart";
import { createOrder } from "../domain/order";

// Note that the port interfaces are in the _application layer_,
// but their implementation is in the _adapter_ layer.
import { usePayment } from "../services/paymentAdapter";
import { useNotifier } from "../services/notificationAdapter";
import { useCartStorage, useOrdersStorage } from "../services/storageAdapter";

export function useOrderProducts() {
  // Usually, we access services through Dependency Injection.
  // Here we can use hooks as a crooked “DI-container”.
  const notifier = useNotifier();
  const payment = usePayment();
  const orderStorage = useOrdersStorage();
  const cartStorage = useCartStorage();

  // We can also get `user` and `cart` right here through the corresponding hooks
  // and not pass them as arguments to a function.

  // Ideally, we would pass a command as an argument,
  // which would encapsulate all input data.
  async function orderProducts(user: User, cart: Cart) {
    // Here we can validate the data before creating the order.

    // 声明接口，实现接口
    const order = createOrder(user, cart);

    // The use case function doesn't call third-party services directly,
    // instead, it relies on the interfaces we declared earlier.
    const paid = await payment.tryPay(order.total);
    if (!paid) return notifier.notify("The payment wasn't successful 🤷");

    // And here we can save the order on the server, if necessary.

    const { orders } = orderStorage;
    orderStorage.updateOrders([...orders, order]);
    cartStorage.emptyCart();
  }

  return { orderProducts };
}


// 用户的操作
// 删除团队用户故事
// 用户删除组织下面的一个某个团队(部门或者子部门)
// 用户选择组织后查询团队
// 调用Api来删除团队
// 保存起来
// 通知删除操作的结果(成功还是失败)
// 获取最新的团队信息
// 更新当前选中团队
// 把团队信息保存到本地
// 拉取最新的当前团队成员
// 把最新的团队成员信息保存到本地

// 用户新建一个部门
// setup1: 远程请求
// setup2: 告诉用户结果
// setup3: 拉取最新的团队数据
// setup4: 设置当前选中的团队
// setup5: 本地保存最新的数据
// setup6: 远程请求最新的成员列表
// setup7: 把最新的成员列表信息保存在本地

/* 分析用例(用户的操作) */
/* 1、用户点击了(选择)团队 */
/* 2、用户删除了团队 */
/* 3、用户给团队换个名字 */
/* 4、用户给团队换个位置 */
/* 5、用户给团队添加新的成员 */
/* 6、用户新创建了团队 */
/* 7、用户搜索了团队 */

/* 8、用户选择了组织 */
/* 所以：getTeam获取团队信息不应该是一个用例，但是可以在内部使用？ */
/* 那怎么获取团队信息呢？ 在用户获取到组织之后，就应该获取一次团队信息。 */

/* getTeam应该仅仅用户获取最新的数据，直接调用API服务? */
