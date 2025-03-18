import { useState } from "react";
import { useLocation } from "wouter";
import { Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";

export default function CartDrawer() {
  const [location, navigate] = useLocation();
  const { state, dispatch } = useCart();
  const total = state.items.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity < 1) return;
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const handleRemoveItem = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="h-full flex flex-col">
      <SheetHeader className="px-4 py-6 border-b">
        <div className="flex items-center justify-between">
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetClose asChild>
            <Button variant="ghost" size="icon">
              <X className="h-4 w-4" />
            </Button>
          </SheetClose>
        </div>
      </SheetHeader>

      {state.items.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          Your cart is empty
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-auto px-4">
            <ul className="divide-y">
              {state.items.map((item) => (
                <li key={item.id} className="py-4">
                  <div className="flex gap-4">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="h-20 w-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        ${item.price}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.id,
                              parseInt(e.target.value)
                            )
                          }
                          className="w-20"
                          min="1"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t p-4 space-y-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Button className="w-full" onClick={handleCheckout}>
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
