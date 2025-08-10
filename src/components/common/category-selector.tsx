import { categoryTable } from "@/db/schema";
import { Button } from "../ui/button";

interface CategorySelectorProps {
  categories: (typeof categoryTable.$inferSelect)[];
}

const CategorySelector = ({ categories }: CategorySelectorProps) => {
  return (
    <div className="rounded-3xl bg-[#f4efff] p-6">
      <div className="grid grid-cols-2 gap-3">
        {categories.map((c) => (
          <Button key={c.id} variant="ghost" className="cursor-pointer rounded-full bg-white"> {c.name}</Button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
