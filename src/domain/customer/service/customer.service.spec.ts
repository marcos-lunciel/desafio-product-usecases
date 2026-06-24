import Address from "../value-object/address";
import Customer from "../entity/customer";
import EventDispatcherService from "../../@shared/service/event-dispatcher.service";
import CustomerService from "./customer.service";

describe("Customer Service unit tests", () => {
    it("should change customer address and notify event", () => {
        const spyAdressUpdated = jest.spyOn(EventDispatcherService.getInstance(), "notify");
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.address = address;

        expect(customer.address).toBe(address);

        const newAddress = new Address("Street 2", 2, "Zipcode 2", "City 2");

        CustomerService.changeAddress(customer, newAddress);

        expect(customer.address).toBe(newAddress);
        expect(spyAdressUpdated).toHaveBeenCalled();
    });
});

