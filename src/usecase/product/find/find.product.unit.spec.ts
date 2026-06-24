import { describe, it, expect, jest } from "@jest/globals";
import FindProductUseCase from "./find.product.usecase";

const product = {
    id: "1",
    name: "Product 1",
    price: 10
};

const MockRepository: () => any = () => {
    return {
        create: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        update: jest.fn()
    }
};

describe("Unit test find product use case", () => {
    it("should find a product", async () => {
        const productRepository = MockRepository();
        const usecase = new FindProductUseCase(productRepository);

        const input = {
            id: "1"
        };

        const output = await usecase.execute(input);

        expect(output).toEqual({
            id: product.id,
            name: product.name,
            price: product.price
        });
    });
});