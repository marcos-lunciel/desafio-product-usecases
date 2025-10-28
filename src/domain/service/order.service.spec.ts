import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order Service unit tests", () => {

    it("should place an order", () => {
        const customer = new Customer('123', 'Customer 1');
        const item1 = new OrderItem('1', '1', 'Item 1', 10, 2);

        const order = OrderService.placeOrder(customer, [item1]);

        expect(customer.rewardPoints).toBe(10);
        expect(order.total()).toBe(20);
    });

    it("should throw error when placing an order with no items", () => {
        const customer = new Customer('123', 'Customer 1');

        expect(() => {
            OrderService.placeOrder(customer, []);
        }).toThrowError("Order must have at least one item");
    });

    it("should add reward points", () => {
        const customer = new Customer('123', 'Customer 1');
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);
    });

    it("should get total of all orders", () => {
        const item = new OrderItem('1', '123','Item 1', 10, 3);
        const item2 = new OrderItem('2', '123', 'Item 2', 25, 2);
        
        const order = new Order('1', '123', [item]);
        const order2 = new Order('2', '1234', [item, item2]);
        
        const orders = [order, order2];
        
        const total = OrderService.getTotal(orders);
        expect(total).toBe(110);
    });

});