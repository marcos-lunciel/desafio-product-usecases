import { describe, it, expect, jest } from "@jest/globals";
import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
    name: "John",
    address: {
        street: "Street",
        number: 123,
        zip: "Zip",
        city: "City"
    }
};

const MockRepository: () => any = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn()
    }
};

describe("Unit test create customer use case", () => {
    it("should create a customer", async () => {
        const customerRepository = MockRepository();
        const usecase = new CreateCustomerUseCase(customerRepository);

        const output = await usecase.execute(input);
        
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: input.address
        });
    });

    it("should thrown an error when name is missing", async () => {
        const customerRepository = MockRepository();
        const usecase = new CreateCustomerUseCase(customerRepository);

        input.name = "";
        const inputWithoutName = { ...input };

        await expect(usecase.execute(inputWithoutName)).rejects.toThrow("Name is required");
    
    });

    it("should thrown an error when street is missing", async () => {
        const customerRepository = MockRepository();
        const usecase = new CreateCustomerUseCase(customerRepository);

        input.address.street = "";
        const inputWithoutStreet = { ...input };

        await expect(usecase.execute(inputWithoutStreet)).rejects.toThrow("Street is required");
    
    });
});