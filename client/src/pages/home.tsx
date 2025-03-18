import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductGrid from "@/components/products/product-grid";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative py-20 px-4 bg-gradient-to-r from-primary/10 to-primary/5"
      >
        <div className="container mx-auto">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Premium Accessories for Your Furry Friend
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover our collection of high-quality dog accessories designed for comfort and style.
            </p>
            <Link href="/products">
              <Button size="lg" className="group">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-baseline mb-8">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link href="/products">
            <a className="text-primary hover:underline">View All</a>
          </Link>
        </div>
        <ProductGrid />
      </section>

      {/* Features */}
      <section className="bg-muted/20 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-2">Premium Quality</h3>
              <p className="text-muted-foreground">
                Carefully selected materials for lasting durability
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-2">Fast Shipping</h3>
              <p className="text-muted-foreground">
                Quick delivery to your doorstep
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-2">Satisfaction Guaranteed</h3>
              <p className="text-muted-foreground">
                Love it or get your money back
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
