import { describe, it, expect } from "@jest/globals";
import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            new Customer('', 'John Doe');
        }).toThrowError("customer: Id is required");
    });
    
    it("should throw error when name is empty", () => {
        expect(() => {
            new Customer('123', '');
        }).toThrowError("customer: Name is required");
    });

    it("should throw error when name and id are empty", () => {
        expect(() => {
            new Customer('', '');
        }).toThrowError("customer: Id is required,customer: Name is required");
    });

    it("should change name", () => {
        // Arrange
        let customer = new Customer('123', 'John Doe');
        // Act
        customer.changeName('Jane Doe');
        // Assert
        expect(customer.name).toBe('Jane Doe');
    });

    it("should activate customer", () => {
        // Arrange
        let customer = new Customer('123', 'John Doe');
        const address = new Address('Avenida Audizio Pinheiro', 123, '12345-678', 'Fortaleza'); 
        customer.address = address;
        // Act
        customer.activate();
        // Assert
        expect(customer.isActive).toBe(true);
    });

    it("should throw error when adress is undefined", () => {
        // Arrange
        let customer = new Customer('123', 'John Doe');
        expect(() => {
            // Act
            customer.activate();
        }
        // Assert
        ).toThrowError('Address is required to activate a customer');
    });

    it("should deactive customer", () => {
        // Arrange
        let customer = new Customer('123', 'John Doe');
        // Act
        customer.deactivate();
        // Assert
        expect(customer.isActive).toBe(false);
    });
});