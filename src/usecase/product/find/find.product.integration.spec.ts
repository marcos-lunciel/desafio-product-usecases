import { describe, it, expect, beforeEach, afterEach } from "@jest/globals";
import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infraestructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infraestructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";


describe("Test find product use case", () => {

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

    it("should find a product", async () => {
        const product = await ProductModel.create({
            id: "1",
            name: "Product 1",
            price: 10
        });

        const productRepository = new ProductRepository();
        const usecase = new FindProductUseCase(productRepository);
        
        const input = { id: "1" };
        
        const output = {
            id: "1",
            name: "Product 1",
            price: 10
        }

        const result = await usecase.execute(input);
        
        expect(result).toEqual(output);
    });

});