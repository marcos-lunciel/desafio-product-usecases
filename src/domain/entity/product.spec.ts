import Product from "./product";

describe("Product unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            new Product('', 'Product 1', 10);
        }).toThrowError("Id is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            new Product('123', '', 10);
        }).toThrowError("Name is required");
    });

    it("should throw error when price is less than or equal to 0", () => {
        expect(() => {
            new Product('123', 'Product 1', 0);
        }).toThrowError("Price must be greater than 0");
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