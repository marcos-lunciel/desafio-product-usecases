import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";
import Customer from "../../domain/entity/customer";
import CustomerRepository from "./customer.repository";
import Address from "../../domain/entity/address";

describe("Customer repository test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true}
        });
        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });



    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "Zip 1", "City 1");
        customer.address = address;

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({where: {id: "1"}});

        expect(customerModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Customer 1",
            street: "Street 1",
            number: 1,
            zip: "Zip 1",
            city: "City 1",
            active: customer.isActive,
            rewardPoints: customer.rewardPoints
        });
    });

    it("should update a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "Zip 1", "City 1");
        customer.address = address;

        await customerRepository.create(customer);
        customer.changeName("Customer 2");
        await customerRepository.update(customer);

        const customerModel = await CustomerModel.findOne({where: {id: "1"}});

        expect(customerModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Customer 2",
            street: "Street 1",
            number: 1,
            zip: "Zip 1",
            city: "City 1",
            active: customer.isActive,
            rewardPoints: customer.rewardPoints
        });
    });

    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "Zip 1", "City 1");
        customer.address = address;

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({where: {id: "1"}});
        const foundCustomer = await customerRepository.find("1");

        expect(customerModel.toJSON()).toStrictEqual({
            id: foundCustomer.id,
            name: foundCustomer.name,
            street: foundCustomer.address.street,
            number: foundCustomer.address.number,
            zip: foundCustomer.address.zip,
            city: foundCustomer.address.city,
            active: foundCustomer.isActive,
            rewardPoints: foundCustomer.rewardPoints
        });
    });

    it("should find all customers", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "Zip 1", "City 1");
        customer.address = address;

        await customerRepository.create(customer);


        const customer2 = new Customer("2", "Customer 2");
        const address2 = new Address("Street 1", 1, "Zip 1", "City 1");
        customer2.address = address2;

        await customerRepository.create(customer2);

        const foundProducts = await customerRepository.findAll();
        const products = [customer, customer2]

        expect(foundProducts).toEqual(products)

    });

    it("should throw an error when customer is not found", async () => {
        const customerRepository = new CustomerRepository();

        await expect(customerRepository.find("1")).rejects.toThrow("Customer not found");
    });
});