import Address from "../entity/address";
import Customer from "../entity/customer";
import { CustomerAddressUpdatedEvent } from "../event/@shared/customer/customer-address-updated.event";
import { EnviaConsoleLogHandler } from "../event/@shared/customer/handler/envia-console-log.handler";
import EventDispatcherService from "./event-dispatcher.service";

export default class CustomerService {

    static changeAddress(customer: Customer, newAddress: Address): void {
        customer.address = newAddress;
        const customerAddressUpdatedEvent = new CustomerAddressUpdatedEvent({
            id: customer.id,
            name: customer.name,
            address: `${newAddress.street}, ${newAddress.number}, ${newAddress.zip}, ${newAddress.city}`
        });
        EventDispatcherService.register('CustomerAddressUpdatedEvent', new EnviaConsoleLogHandler());
        EventDispatcherService.notify(customerAddressUpdatedEvent);
        
    }
}