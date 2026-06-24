import Customer from "../../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../../domain/customer/value-object/address";
import CustomerModel from "./customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
    
    async create(entity: Customer): Promise<void> {
        
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.address.street,
            number: entity.address.number,
            zip: entity.address.zip,
            city: entity.address.city,
            active: entity.isActive,
            rewardPoints: entity.rewardPoints
        })
    }

    async update(entity: Customer): Promise<void> {
        await CustomerModel.update(
            {
                id: entity.id,
                name: entity.name,
                street: entity.address.street,
                number: entity.address.number,
                zip: entity.address.zip,
                city: entity.address.city,
                active: entity.isActive,
                rewardPoints: entity.rewardPoints
            },
            {
                where: {
                    id: entity.id
                }
            }
        )
    }

    async find(id: string): Promise<Customer> {
       return CustomerModel.findOne({where: { id : id}}).then((customerModel) => {
            if (!customerModel) {
                throw new Error("Customer not found");
            }
            const customer = new Customer(
                customerModel.id,
                customerModel.name
            );
            const address = new Address(
                customerModel.street,
                customerModel.number,
                customerModel.zip,
                customerModel.city
            );
            customer.address = address;
            if(customerModel.active) {
                customer.activate();
            }
            customer.addRewardPoints(customerModel.rewardPoints);
            
            return customer;
        });
    }

    async findAll(): Promise<Customer[]> {
        const customerModels = await CustomerModel.findAll();

        return customerModels.map((customerModel) => {
            const customer = new Customer(
                customerModel.id,
                customerModel.name
            );
            const address = new Address(
                customerModel.street,
                customerModel.number,
                customerModel.zip,
                customerModel.city
            );
            customer.address = address;
            if(customerModel.active) {
                customer.activate();
            }
            customer.addRewardPoints(customerModel.rewardPoints);
            return customer;
        });
    }

}