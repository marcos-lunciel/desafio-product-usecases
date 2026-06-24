import { describe, it, expect } from "@jest/globals";
import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer Factory Unit Tests", () => {
    it("should create a customer", () => {
        let customer = CustomerFactory.create("John Doe");

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John Doe");
        expect(customer.address).toBeUndefined();
    });

    it("should create a costumer with an address", () => {
        const address = new Address("Main St", 100, "12345-35", "City");
        let customer = CustomerFactory.createWithAddress("John",address);

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.address).toEqual(address);
    });
});
