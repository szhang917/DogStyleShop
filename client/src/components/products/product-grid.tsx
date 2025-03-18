import { useQuery } from "@tanstack/react-query";
import ProductCard from "./product-card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@shared/schema";

interface ProductGridProps {
  category?: string;
  searchQuery?: string;
}

export default function ProductGrid({ category, searchQuery }: ProductGridProps) {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="aspect-square" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (!products?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No products found.</p>
      </div>
    );
  }

  const filteredProducts = products.filter((product) => {
    const matchesCategory = !category || product.category === category;
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No products match your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}