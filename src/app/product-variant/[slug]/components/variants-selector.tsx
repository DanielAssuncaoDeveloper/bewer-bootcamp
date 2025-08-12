"use client"

import { productVariantTable } from "@/db/schema";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

interface VariantSelectorProps {
  variants: (typeof productVariantTable.$inferSelect)[];
}

const VariantSelector = ({ variants }: VariantSelectorProps) => {
  const { slug } = useParams();

  return (
    <div className="flex items-center gap-4">
      {variants.map((variant) => (
        <Link
          key={variant.id}
          href={`/product-variant/${variant.slug}`}
          className={slug === variant.slug ? "border-primary border-2 rounded-xl" : ""}
        >
          <Image
            src={variant.imageUrl}
            alt={variant.name}
            width={68}
            height={68}
            className="rounded-xl"
          />
        </Link>
      ))}
    </div>
  );
};

export default VariantSelector;
