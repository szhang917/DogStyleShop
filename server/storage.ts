import { Product, InsertProduct, Order, InsertOrder } from "@shared/schema";

export interface IStorage {
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createOrder(order: InsertOrder): Promise<Order>;
}

export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private orders: Map<number, Order>;
  private currentProductId: number;
  private currentOrderId: number;

  constructor() {
    this.products = new Map();
    this.orders = new Map();
    this.currentProductId = 1;
    this.currentOrderId = 1;
    this.initializeProducts();
  }

  private initializeProducts() {
    const products: InsertProduct[] = [
      {
        name: "Luxury Leather Dog Collar",
        description: "Premium handcrafted leather collar with soft padding and durable brass hardware",
        price: "29.99",
        images: ["https://images.unsplash.com/photo-1602584386319-fa8eb4361c2c"],
        category: "Collars",
        stock: 50
      },
      {
        name: "Interactive Puzzle Toy",
        description: "Challenging puzzle toy that keeps dogs mentally stimulated and entertained",
        price: "19.99",
        images: ["https://images.unsplash.com/photo-1576201836106-db1758fd1c97"],
        category: "Toys",
        stock: 100
      },
      {
        name: "Cozy Pet Bed",
        description: "Ultra-soft orthopedic bed perfect for dogs of all sizes",
        price: "49.99",
        images: ["https://images.unsplash.com/photo-1585429198490-ee58f9aa021b"],
        category: "Beds",
        stock: 30
      },
      {
        name: "Adjustable Harness",
        description: "Comfortable and secure harness with reflective strips for night walks",
        price: "34.99",
        images: ["https://images.unsplash.com/photo-1622566359362-f7c39e1c6aa0"],
        category: "Harnesses",
        stock: 75
      },
      {
        name: "Squeaky Ball Set",
        description: "Set of 3 durable squeaky balls in different sizes",
        price: "12.99",
        images: ["https://images.unsplash.com/photo-1601758176175-45914394491c"],
        category: "Toys",
        stock: 200
      },
      {
        name: "Travel Water Bottle",
        description: "Portable water bottle with built-in drinking bowl for walks and trips",
        price: "15.99",
        images: ["https://images.unsplash.com/photo-1603803721487-97009ec87414"],
        category: "Accessories",
        stock: 150
      },
      {
        name: "Grooming Brush",
        description: "Professional-grade brush for all coat types",
        price: "24.99",
        images: ["https://images.unsplash.com/photo-1583336663277-620dc1996580"],
        category: "Grooming",
        stock: 80
      },
      {
        name: "Treat Dispenser",
        description: "Interactive toy that dispenses treats while playing",
        price: "16.99",
        images: ["https://images.unsplash.com/photo-1581467655410-0c2bf55d9d6c"],
        category: "Toys",
        stock: 120
      }
    ];

    products.forEach(product => {
      const id = this.currentProductId++;
      this.products.set(id, { ...product, id });
    });
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.category === category
    );
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    const order: Order = { ...insertOrder, id };
    this.orders.set(id, order);
    return order;
  }
}

export const storage = new MemStorage();