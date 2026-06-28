import { describe, it, expect } from "@jest/globals";
import Product from "./product";

describe("Product unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            new Product('', 'Product 1', 10);
        }).toThrowError("product: Id is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            new Product('123', '', 10);
        }).toThrowError("product: Name is required");
    });

    it("should throw error when price is less than or equal to 0", () => {
        expect(() => {
            new Product('123', 'Product 1', 0);
        }).toThrowError("product: Price must be greater than 0");
    });

    it("should throw error when name and price are invalid", () => {
        expect(() => {
            new Product('123', '', -10);
        }).toThrowError("product: Name is required,product: Price must be greater than 0");
    });

    it("should throw error when id, name and price are invalid", () => {
        expect(() => {
            new Product('', '', -10);
        }).toThrowError("product: Id is required,product: Name is required,product: Price must be greater than 0");
    });

    it("should change name", () => {
        // Arrange
        const product = new Product('123', 'Product 1', 10);
        // Act
        product.changeName('Product 2');
        // Assert
        expect(product.name).toBe('Product 2');
    });

    it("should change price", () => {
        // Arrange
        const product = new Product('123', 'Product 1', 100);
        // Act
        product.changePrice(150);
        // Assert
        expect(product.price).toBe(150);
    });
});