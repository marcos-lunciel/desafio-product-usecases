import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
    
    it("should throw error when id is empty", () => {
        expect(() => {
            new Order('', '123', []);
        }).toThrowError("Id is required");
    });
    
    it("should throw error when customerId is empty", () => {
        expect(() => {
            new Order('123', '', []);
        }).toThrowError("CustomerId is required");
    });

    it("should throw error when there are no items", () => {
        expect(() => {
            new Order('123', '1234', []);
        }).toThrowError("Items qtd must be greater than 0");
    });

    it("should calculate total", () => {
        const item = new OrderItem('1', '123','Item 1', 10, 3);
        const item2 = new OrderItem('2', '123', 'Item 2', 25, 2);
        const order = new Order('1', '123', [item]);
        expect(order.total()).toBe(30);
        const order2 = new Order('1', '123', [item, item2]);
        expect(order2.total()).toBe(80);
    });

    it("should throw error when the quantity is greater than 0", () => {
        const item = new OrderItem('1', '123','Item 1', 10, 0);
        expect(() => {
            new Order('123', '1234', [item]);
        }).toThrowError("Quantity must be greater than 0");
    });
});