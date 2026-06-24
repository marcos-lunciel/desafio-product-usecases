import { describe, it, expect, beforeEach, afterEach } from "@jest/globals";
import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infraestructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infraestructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

describe("Test find customer use case", () => {

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });
  
  it("should find a customer", async () => {
    const customer = new Customer("123", "John");
    const address = new Address("Street", 123, "Zip", "City");
    customer.address = address;

    const customerRepository = new CustomerRepository();
    const usercase = new FindCustomerUseCase(customerRepository);
    await customerRepository.create(customer);

    const input = { id: "123" };

    const output = {
      id: "123",
      name: "John",
      address: {
        street: "Street",
        number: 123,
        zip: "Zip",
        city: "City"
      }
    }

    const result = await usercase.execute(input);

    expect(result).toEqual(output);
  });
});