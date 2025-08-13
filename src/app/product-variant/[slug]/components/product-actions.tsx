"use client";

import { Button } from "@/components/ui/button";
import AddToCartButton from "./add-to-cart-button";
import QuantitySelector from "./quantity-selector";
import ProductList from "@/components/common/product-list";
import { useState } from "react";
import { MinusIcon, PlusIcon } from "lucide-react";

interface ProductActionsProps {
  productVariantId: string;
}

const ProductActions = ({ productVariantId }: ProductActionsProps) => {
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => {
    setQuantity((prev) => ++prev);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev == 0 ? 0 : --prev));
  };

  return (
    <>
      <div className="space-y-4">
          <h3 className="font-medium">Quantidade</h3>
          <div className="flex w-[110px] items-center justify-between rounded-sm border">
            <Button
              onClick={() => handleDecrement()}
              size="icon"
              variant="ghost"
            >
              <MinusIcon />
            </Button>
            <p>{quantity}</p>
            <Button
              onClick={() => handleIncrement()}
              size="icon"
              variant="ghost"
            >
              <PlusIcon />
            </Button>
          </div>
        </div>
      
      <div className="flex flex-col space-y-4">
        <AddToCartButton productVariantId={productVariantId} quantity={quantity} />
        <Button className="rounded-full" size="lg">
          Comprar agora
        </Button>
      </div>
    </>
  );
};

export default ProductActions;
