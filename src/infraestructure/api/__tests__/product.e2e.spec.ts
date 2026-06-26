import { describe, it, expect, beforeEach, afterAll } from "@jest/globals";
import {app, sequelize} from "../express";
import request from "supertest";

describe("E2E Test for Product API", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should list all products", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "Product 1",
                price: 10
            });

        expect(response.status).toBe(200);

        const response2 = await request(app)
            .post("/product")
            .send({
                name: "Product 2",
                price: 20
            });

        expect(response2.status).toBe(200);

        const listResponse = await request(app)
            .get("/product")
            .send();

        expect(listResponse.status).toBe(200);
        expect(listResponse.body.products.length).toBe(2);

        const product1 = listResponse.body.products[0];
        const product2 = listResponse.body.products[1];

        expect(product1.name).toBe("Product 1");
        expect(product1.price).toBe(10);

         expect(product2.name).toBe("Product 2");
        expect(product2.price).toBe(20);
    });
});