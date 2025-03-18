import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductGrid from "@/components/products/product-grid";
import type { Product } from "@shared/schema";

export default function Products() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const categories = Array.from(new Set(products.map((p) => p.category))).sort();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Our Products</h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="sm:max-w-xs"
          />

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="sm:max-w-xs">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <ProductGrid category={category === "all" ? "" : category} searchQuery={search} />
    </div>
  );
}