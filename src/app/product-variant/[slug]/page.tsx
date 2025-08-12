import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";
import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";
import VariantSelector from "./components/variants-selector";
import { truncate } from "fs";

interface ProductVariantPageProps {
  params: Promise<{ slug: string }>;
}

const ProductVariantPage = async ({ params }: ProductVariantPageProps) => {
  const { slug } = await params;
  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true
        }
      }
    },
  });

  if (!productVariant) return notFound();

  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: {
      variants: true,
    },
  });

  return (
    <>
      <Header />

      <div className="flex flex-col space-y-6">
        <div className="relative h-[380px] w-full rounded-3xl">
          <Image
            src={productVariant.imageUrl}
            alt={productVariant.name}
            className="object-cover"
            fill
          />
        </div>
        <div className="px-5">
          <VariantSelector variants={productVariant.product.variants} />
        </div>

        <div className="px-5">
          <h2 className="text-lg font-semibold">
            {productVariant.product.name}
          </h2>
          <h3 className="text-muted-foreground text-sm">
            {productVariant.name}
          </h3>
          <h3 className="text-lg font-semibold">
            {formatCentsToBRL(productVariant.priceInCents)}
          </h3>
        </div>

        <div>{/* Quantidade */}</div>

        <div className="flex flex-col space-y-4 px-5">
          <Button className="rounded-full" variant="outline" size="lg">
            Comprar agora
          </Button>
          <Button className="rounded-full" size="lg">
            Adicionar ao carrinho
          </Button>

          <div className="px-5">
            <p className="text-sm">{productVariant.product.description}</p>
          </div>

          <ProductList title="Talvez você goste" products={likelyProducts} />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default ProductVariantPage;
