"use client";

import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

const QuantitySelector = () => {
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => {
    setQuantity((prev) => ++prev)
  }

  const handleDecrement = () => {
    setQuantity((prev) => prev == 0 ? 0 : --prev)
  }

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Quantidade</h3>
      <div className="flex w-[110px] items-center justify-between border rounded-sm">
        <Button onClick={() => handleDecrement()} size="icon" variant="ghost">
          <MinusIcon />
        </Button>
        <p>{quantity}</p>
        <Button onClick={() => handleIncrement()} size="icon" variant="ghost">
          <PlusIcon />
        </Button>
      </div>
    </div>
  );
};

export default QuantitySelector;
