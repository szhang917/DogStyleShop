import { useLocation } from "wouter";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Confirmation() {
  const [_, navigate] = useLocation();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-6 flex justify-center">
          <CheckCircle className="h-16 w-16 text-primary" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
        
        <p className="text-muted-foreground mb-8">
          Thank you for your purchase. We'll send you an email with your order details
          and tracking information once your order ships.
        </p>

        <Button onClick={() => navigate("/products")}>
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}
