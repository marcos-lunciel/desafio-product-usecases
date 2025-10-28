import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
      },
      {
        where: {
          id: entity.id
        },
      }
    );

    await OrderItemModel.destroy({
      where: {
        order_id: entity.id
      }
    });

    const items = entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          order_id: entity.id,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
    }));

    for (const item of items) {
      await OrderItemModel.create(item);
    }
  }

  async find(id: string): Promise<Order> {
    return OrderModel.findOne({
      where: { id },
      include: ["items"],
    }).then((orderModel) => {
      if (!orderModel) {
        throw new Error("Order not found");
      }

      const orderItems = orderModel.items.map((item) => {
        return new OrderItem(
          item.id,
          item.product_id,
          item.name,
          item.price,
          item.quantity
        );
      });

      const order = new Order(
        orderModel.id,
        orderModel.customer_id,
        orderItems
      );

      return order;
    });
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({ include: ["items"] });
  
    return orderModels.map((orderModel) => {
      const orderItems = orderModel.items.map((item) => {
        return new OrderItem(
          item.id,
          item.product_id,
          item.name,
          item.price,
          item.quantity
        );
      });
        
      const order = new Order(
        orderModel.id,
        orderModel.customer_id,
        orderItems
      );

      return order;
    });
  }
}