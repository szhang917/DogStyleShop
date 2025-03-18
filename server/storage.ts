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
        name: "Luxury Dog Collar",
        description: "Premium leather collar with soft padding",
        price: "29.99",
        images: ["https://images.unsplash.com/photo-1511169245529-95ab68997f95"],
        category: "Collars",
        stock: 50
      },
      {
        name: "Interactive Dog Toy",
        description: "Durable puzzle toy for mental stimulation",
        price: "19.99",
        images: ["https://images.unsplash.com/photo-1546421845-6471bdcf3edf"],
        category: "Toys",
        stock: 100
      },
      // Add more products using the stock photos
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
