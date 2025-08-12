import { categoryTable } from "@/db/schema";
import { Button } from "../ui/button";
import Link from "next/link";

interface CategorySelectorProps {
  categories: (typeof categoryTable.$inferSelect)[];
}

const CategorySelector = ({ categories }: CategorySelectorProps) => {
  return (
    <div className="rounded-3xl bg-[#f4efff] p-6">
      <div className="grid grid-cols-2 gap-3">
        {categories.map((c) => (
          <Button
            asChild
            key={c.id}
            variant="ghost"
            className="cursor-pointer rounded-full bg-white"
          >
            <Link href={`/category/${c.slug}`}>{c.name}</Link>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
