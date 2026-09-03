import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";

const ProductList = ({ defaultCategory = "all", showFilter = true }) => {
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState(defaultCategory);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products").then((response) => {
      setProducts(response.data);
    }).catch((error) => {
      console.error("Error fetching products:", error);
    });
  }, []);

  let sortedProducts = [...products];

  if (sort === "low") {
    sortedProducts.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  if (category !== "all") {
    sortedProducts = sortedProducts.filter(
      (product) => product.category === category
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
            <option value="headset">Headset</option>
          </select>
        </div>
      )}

      <div className="
  grid
  grid-cols-1
  sm:grid-cols-2
  lg:grid-cols-3
  xl:grid-cols-4
  gap-6
  px-4 sm:px-6 lg:px-10
  mt-8
  justify-items-center
">
  {sortedProducts.map((product) => (
    <ProductCard
      key={product._id}
      product={product}
    />
  ))}
</div>
    </div>
  );
};

export default ProductList;