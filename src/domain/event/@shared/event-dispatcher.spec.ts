import { CustomerAddressUpdatedEvent } from "./customer/customer-address-updated.event";
import { CustomerCreatedEvent } from "./customer/customer-created.event";
import { EnviaConsoleLog1Handler } from "./customer/handler/envia-console-log1.handler";
import EventDispatcher from "./event-dispatcher";
import SendEmailWhenProductIsCreatedHandler from "./product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "./product/product-created.event";

describe("Domain events tests", () => {

    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0])
            .toMatchObject(eventHandler);
    });

    it("should unregister an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0])
            .toMatchObject(eventHandler);
        
        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
    });

    it("should unregister all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0])
            .toMatchObject(eventHandler);
    
        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
    });

    it("should notify all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0])
            .toMatchObject(eventHandler);

        const productCreatedEvent = new ProductCreatedEvent(
            {
                name: "Product 1",
                description: "Product 1 description",
                price: 10.0
            }
        );
        
        eventDispatcher.notify(productCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    });

    it("should register customer created event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const enviaConsole1Handler = new EnviaConsoleLog1Handler();
        const enviaConsole2Handler = new EnviaConsoleLog1Handler();

        eventDispatcher.register("CustomerCreatedEvent", enviaConsole1Handler);
        eventDispatcher.register("CustomerCreatedEvent", enviaConsole2Handler);
        
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0])
            .toMatchObject(enviaConsole1Handler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1])
            .toMatchObject(enviaConsole2Handler);
    });

    it("should notify customer created event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const enviaConsole1Handler = new EnviaConsoleLog1Handler();
        const enviaConsole2Handler = new EnviaConsoleLog1Handler();

        const spyEnviaConsole1Handler = jest.spyOn(enviaConsole1Handler, "handle");
        const spyEnviaConsole2Handler = jest.spyOn(enviaConsole2Handler, "handle");

        eventDispatcher.register("CustomerCreatedEvent", enviaConsole1Handler);
        eventDispatcher.register("CustomerCreatedEvent", enviaConsole2Handler);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0])
            .toMatchObject(enviaConsole1Handler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1])
            .toMatchObject(enviaConsole2Handler);
        
        const customerCreatedEvent = new CustomerCreatedEvent({
            name: "Customer 1",
            adress: {
                street: "Street 1",
                number: 123,
                zip: "12345-678",
                city: "City 1"
            }
        });

        eventDispatcher.notify(customerCreatedEvent);
        
        expect(spyEnviaConsole1Handler).toHaveBeenCalled();
        expect(spyEnviaConsole2Handler).toHaveBeenCalled();
    });

    it("should notify customer address updated event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const enviaConsoleLogHandler = new EnviaConsoleLog1Handler();
        
        const spyEnviaConsoleLogHandler = jest.spyOn(enviaConsoleLogHandler, "handle");
        eventDispatcher.register("CustomerAddressUpdatedEvent", enviaConsoleLogHandler);

        expect(eventDispatcher.getEventHandlers["CustomerAddressUpdatedEvent"][0])
            .toMatchObject(enviaConsoleLogHandler);

        const customerAddressUpdatedEvent = new CustomerAddressUpdatedEvent({
            id: "123",
            name: "Customer 1",
            adress: "Street 1, 123, 12345-678, City 1"
        });
        
        eventDispatcher.notify(customerAddressUpdatedEvent);

        expect(spyEnviaConsoleLogHandler).toHaveBeenCalled();
    });
});