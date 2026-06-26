import { describe, it, expect, beforeEach, afterAll } from "@jest/globals";
import {app, sequelize} from "../express";
import request from "supertest";

describe("E2E Test for Customer API", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });
    
    it("should create a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "John Doe",
                address: {
                    street: "123 Main St",
                    number: 456,
                    zip: "12345",
                    city: "Anytown"
                }
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("John Doe");
        expect(response.body.address.street).toBe("123 Main St");
        expect(response.body.address.number).toBe(456);
        expect(response.body.address.zip).toBe("12345");
        expect(response.body.address.city).toBe("Anytown");
    });

    it("should not create a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "John Doe"
            });

        expect(response.status).toBe(500);
    });


    it("should list all customers", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "John Doe",
                address: {
                    street: "123 Main St",
                    number: 456,
                    zip: "12345",
                    city: "Anytown"
                }
            });

        expect(response.status).toBe(200);

        const response2 = await request(app)
            .post("/customer")
            .send({
                name: "Jane Doe",
                address: {
                    street: "456 Oak Ave",
                    number: 789,
                    zip: "4567",
                    city: "Anothertown"
                }
            });

        expect(response2.status).toBe(200);

        const listResponse = await request(app)
            .get("/customer")
            .send();

        expect(listResponse.status).toBe(200);
        expect(listResponse.body.customers.length).toBe(2);
        const customer1 = listResponse.body.customers[0];
        const customer2 = listResponse.body.customers[1];

        expect(customer1.name).toBe("John Doe");
        expect(customer1.address.street).toBe("123 Main St");
        expect(customer1.address.number).toBe(456);
        expect(customer1.address.zip).toBe("12345");
        expect(customer1.address.city).toBe("Anytown");

        expect(customer2.name).toBe("Jane Doe");
        expect(customer2.address.street).toBe("456 Oak Ave");
        expect(customer2.address.number).toBe(789);
        expect(customer2.address.zip).toBe("4567");
        expect(customer2.address.city).toBe("Anothertown");
    });
});