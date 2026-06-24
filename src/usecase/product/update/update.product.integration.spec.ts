import { describe, it, expect, beforeEach, afterEach } from "@jest/globals";
import ProductModel from "../../../infraestructure/product/repository/sequelize/product.model";
import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infraestructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import Product from "../../../domain/product/entity/product";


describe("Test update product use case", () => {
    let sequelize: Sequelize;
    
    beforeEach(async () => {
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
    });

    afterEach(async () => {
    await sequelize.close();
    });
    
    it("should update a product", async () => {
        const product = new Product("1", "Product 1", 10);
        const productRepository = new ProductRepository();
        const usecase = new UpdateProductUseCase(productRepository);

        productRepository.create(product);

        const input = {
            id: "1",
            name: "Product 1 Updated",
            price: 20
        };

        const output = {
            id: "1",
            name: "Product 1 Updated",
            price: 20
        }

        const result = await usecase.execute(input);

        expect(result).toEqual(output);
    });
});