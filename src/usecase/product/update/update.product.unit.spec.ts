import { describe, it, expect, jest } from "@jest/globals";
import UpdateProductUseCase from "./update.product.usecase";
import Product from "../../../domain/product/entity/product";

const product: Product = new Product("1", "Product 1", 10);

const productUpdated = {
    id: "1",
    name: "Product 1 Updated",
    price: 20
};

const MockRepository: () => any = () => {
    return {
        create: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        update: jest.fn().mockReturnValue(Promise.resolve(productUpdated))
    }
};

describe("Unit test update product use case", () => {
    it("should update a product", async () => {
        const productRepository = MockRepository();
        const usecase = new UpdateProductUseCase(productRepository);

        const input = {
            id: "1",
            name: "Product 1 Updated",
            price: 20
        };
        
        const output = await usecase.execute(input);

        expect(output).toEqual({
            id: input.id,
            name: input.name,
            price: input.price
        });
    });
});

