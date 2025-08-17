"use client";

import { ShoppingBasketIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetHeader, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "@/actions/get-cart";
import Image from "next/image";
import CartItem from "./carts-item";

const Cart = () => {
  const { data: cart, isPending: cartIsLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
  });


  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <ShoppingBasketIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Carrinho</SheetTitle>
        </SheetHeader>  

        <div className="space-y-4 px-5">
          {cartIsLoading && <div>Carregando...</div>}
          {
            cart?.items.map((item) => (
              <CartItem
                key={item.id}
                id={item.id}
                productName={item.productVariant.product.name}
                productVariantName={item.productVariant.name}
                productVariantImageUrl={item.productVariant.imageUrl}
                productVariantTotalPriceInCents={item.productVariant.priceInCents}
                quantity={item.quantity}
              />
            ))
          }
        </div>

      </SheetContent>
    </Sheet>
  );
};

export default Cart;
