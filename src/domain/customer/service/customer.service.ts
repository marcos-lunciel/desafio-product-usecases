import Address from "../value-object/address";
import Customer from "../entity/customer";
import { CustomerAddressUpdatedEvent } from "../event/customer-address-updated.event";
import { EnviaConsoleLogHandler } from "../event/handler/envia-console-log.handler";
import EventDispatcherService from "../../@shared/service/event-dispatcher.service";

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