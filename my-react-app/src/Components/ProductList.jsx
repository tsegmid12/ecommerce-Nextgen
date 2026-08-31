import { useState } from "react";
import products from "../data/product";
import ProductCard from "./ProductCard";

const ProductList = ({ defaultCategory = "all", showFilter = true }) => {
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState(defaultCategory);

  let sortedProducts = [...products];

  if (sort === "low") {
    sortedProducts.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  if (category !== "all") {
    sortedProducts = sortedProducts.filter(
      (product) => product.categore === category
    );
  }

  return (
    <div>
      {showFilter && (
        <div className="flex justify-end mt-10">
          <select
            className="border h-8 rounded"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>

          <select
            className="border h-8 w-40 rounded ml-4 mr-30"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="mouse">Mouse</option>
            <option value="keyboard">Keyboard</option>
            <option value="mousepad">Mousepad</option>
          </select>
        </div>
      )}

      <div className="grid gap-4 gap-x-0 grid-cols-4 justify-items-center mt-10">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;