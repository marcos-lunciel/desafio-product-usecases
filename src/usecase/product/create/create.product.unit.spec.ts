import { describe, it, expect, jest } from "@jest/globals";
import CreateProductUseCase from "./create.product.usecase";

const MockRepository: () => any = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn()
    }
};

describe("Unit test create product use case", () => {
    it("should create a product", async () => {
        const productRepository = MockRepository();
        const usecase = new CreateProductUseCase(productRepository);

        const input = {
            name: "Product 1",
            price: 10
        };

        const output = await usecase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        });
    });

    it("should thrown an error when name is missing", async () => {
        const productRepository = MockRepository();
        const usecase = new CreateProductUseCase(productRepository);

        const input = {
            name: "",
            price: 10
        };

        await expect(usecase.execute(input)).rejects.toThrow("Name is required");
    });

    it("should thrown an error when price is less than zero", async () => {
        const productRepository = MockRepository();
        const usecase = new CreateProductUseCase(productRepository);

        const input = {
            name: "Product 1",
            price: -1
        };

        await expect(usecase.execute(input)).rejects.toThrow("Price must be greater than 0");
    });
});
