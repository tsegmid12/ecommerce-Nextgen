import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const TopSeller = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/products`
        );

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

  const sortedProducts = [...products]
    .sort(
      (a, b) =>
        (Number(b.sold) || 0) - (Number(a.sold) || 0)
    )
    .slice(0, 4);

  return (
    <div className="w-full bg-[#f7f7f7] px-4 py-10 sm:px-6 lg:px-8">

      {/* Section Header */}
      <div className="mx-auto mb-8 flex max-w-7xl items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
            Эрэлттэй бүтээгдэхүүн
          </h1>

          <div className="mt-3 h-1 w-16 rounded-full bg-blue-500"></div>
        </div>

        <button
          type="button"
          onClick={() => navigate("/shop")}
          className="hidden cursor-pointer text-sm font-semibold text-blue-500 transition hover:scale-105 hover:text-blue-600 sm:block"
        >
          Бүгдийг харах →
        </button>
      </div>

      {/* Products */}
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

      {/* Mobile See All */}
      <div className="mt-8 flex justify-center sm:hidden">
        <button
          type="button"
          onClick={() => navigate("/shop")}
          className="cursor-pointer rounded-xl border border-blue-500 px-6 py-2.5 font-semibold text-blue-500 transition hover:bg-blue-500 hover:text-white"
        >
          Бүгдийг харах →
        </button>
      </div>

    </div>
  );
};

export default TopSeller;