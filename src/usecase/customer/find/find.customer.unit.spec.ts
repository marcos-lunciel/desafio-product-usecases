import { describe, it, expect, jest } from "@jest/globals";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("123", "John");
const address = new Address("Street", 123, "Zip", "City");
customer.address = address;

const MockRepository: () => any = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe("Test find customer use case", () => {

  it("should find a customer", async () => {
    const customerRepository = MockRepository();
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

  it("should not find a customer", async () => {
    const customerRepository = MockRepository();
    customerRepository.find.mockImplementation(() => {
      throw new Error("Customer not found");
    });
    const usercase = new FindCustomerUseCase(customerRepository);

    const input = { id: "123" };

    expect(()=>{
      return usercase.execute(input);
    }).rejects.toThrow("Customer not found");
  });
});