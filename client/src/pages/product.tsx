import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/lib/cart";
import type { Product } from "@shared/schema";

export default function ProductPage() {
  const { id } = useParams();
  const { dispatch } = useCart();
  const { toast } = useToast();

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: [`/api/products/${id}`],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="bg-muted h-96 rounded-lg mb-8" />
          <div className="space-y-4">
            <div className="h-8 bg-muted rounded w-1/3" />
            <div className="h-4 bg-muted rounded w-1/4" />
            <div className="h-20 bg-muted rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground">
          The product you're looking for doesn't exist.
        </p>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch({ type: "ADD_ITEM", payload: product });
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-0">
            <div className="aspect-square">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover rounded-t-lg"
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-bold">${product.price}</p>
          
          <div className="prose">
            <p>{product.description}</p>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Category: {product.category}
            </p>
            <p className="text-sm text-muted-foreground">
              Stock: {product.stock} available
            </p>
          </div>

          <Button
            size="lg"
            className="w-full"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
