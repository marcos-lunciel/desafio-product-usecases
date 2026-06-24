import { describe, it, expect, beforeEach, afterEach } from "@jest/globals";
import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infraestructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infraestructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";

describe("Test list product use case", () => {
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



    it("should list all products", async () => {
        const product1 = await ProductModel.create({
            id: "1",
            name: "Product 1",
            price: 10
        });

        const product2 = await ProductModel.create({
            id: "2",
            name: "Product 2",
            price: 20
        });
    
        const productRepository = new ProductRepository();
        const usecase = new ListProductUseCase(productRepository);
        
        const output = {
            products: [
                {
                    id: "1",
                    name: "Product 1",
                    price: 10
                },
                {
                    id: "2",
                    name: "Product 2",
                    price: 20
                }
            ]
        }

        const result = await usecase.execute({});

        expect(result.products.length).toEqual(2);
        expect(result.products[0]).toEqual(output.products[0]);
        expect(result.products[1]).toEqual(output.products[1]);
    });
});
    