import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const ProductList = ({ defaultCategory = "all", showFilter = true }) => {
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState(defaultCategory);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/products`);

        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error(
          "Error fetching products:",
          error.response?.data || error.message
        );
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  let sortedProducts = [...products];

  if (sort === "low") {
    sortedProducts.sort(
      (a, b) => (Number(a.price) || 0) - (Number(b.price) || 0)
    );
  }

  if (sort === "high") {
    sortedProducts.sort(
      (a, b) => (Number(b.price) || 0) - (Number(a.price) || 0)
    );
  }

  if (category !== "all") {
    sortedProducts = sortedProducts.filter(
      (product) =>
        product.category?.toLowerCase() === category.toLowerCase()
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7]">

      {/* FILTER */}
      {showFilter && (
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-end">

            {/* SORT */}
            <div className="flex items-center gap-2">
              <span className="hidden text-sm font-medium text-gray-500 sm:block">
                Sort by:
              </span>

              <select
                className="h-10 w-full cursor-pointer rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm font-medium text-gray-700 outline-none transition hover:border-gray-300 focus:border-gray-400 sm:w-48"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="">Sort</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
            </div>

            {/* CATEGORY */}
            <div className="flex items-center gap-2">
              <span className="hidden text-sm font-medium text-gray-500 sm:block">
                Category:
              </span>

              <select
                className="h-10 w-full cursor-pointer rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm font-medium text-gray-700 outline-none transition hover:border-gray-300 focus:border-gray-400 sm:w-48"
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

          </div>
        </div>
      )}

      {/* PRODUCT COUNT */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 pt-6 sm:px-6 lg:px-8">
        <p className="text-sm font-medium text-gray-500">
          {sortedProducts.length} бүтээгдэхүүн
        </p>

        {category !== "all" && (
          <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-600 shadow-sm">
            {category}
          </span>
        )}
      </div>

      {/* PRODUCTS */}
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 justify-items-center gap-6 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8 xl:grid-cols-4">
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))
        ) : (
          <p className="col-span-full py-10 text-center text-gray-500">
            Бүтээгдэхүүн олдсонгүй
          </p>
        )}
      </div>

    </div>
  );
};

export default ProductList;