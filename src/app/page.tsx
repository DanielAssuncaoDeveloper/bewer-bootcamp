import CategorySelector from "@/components/common/category-selector";
import { Header } from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { db } from "@/db";
import Image from "next/image";

export default async function Home() {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });

  const categories = await db.query.categoryTable.findMany();

  return (
    <div>
      <Header />

      <div className="space-y-6 px-5">
        <Image
          src="/banner-01.png"
          alt="Leve uma vida com estilo"
          className="h-auto w-full"
          height={0}
          width={0}
          sizes="100vw"
        />

        <ProductList products={products} title="Mais vendidos" />

        <CategorySelector categories={categories} />

        <Image
          src="/banner-02.png"
          alt="Seja autêntico"
          className="h-auto w-full"
          height={0}
          width={0}
          sizes="100vw"
        />
      </div>
    </div>
  );
}
