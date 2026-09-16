import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../Components/ProductCard";

const API_URL = import.meta.env.API_URL;

const Wishlist = () => {
  const [wishlistProducts, setWishlistProducts] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.log("Token not found");
          return;
        }

        const response = await axios.get(
          `${API_URL}/api/wishlist`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("WISHLIST:", response.data);

        // Wishlist document-оос product-ийг салгаж авах
        const products = response.data
          .map((item) => item.productId)
          .filter((product) => product);

        setWishlistProducts(products);

      } catch (error) {
        console.error(
          "Error fetching wishlist:",
          error.response?.data || error.message
        );
      }
    };

    fetchWishlist();
  }, []);

  return (
<div className="min-h-screen bg-[#f7f7f7] py-40">

  {/* =========================
      WISHLIST HEADER
  ========================= */}
  <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">

    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

      {/* Title */}
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900">
            Миний Wishlist
          </h1>

          <span className="text-2xl">
            ❤️
          </span>
        </div>

        <p className="mt-2 text-sm text-gray-500">
          Таны хадгалсан дуртай бүтээгдэхүүнүүд
        </p>
      </div>

      {/* Count */}
      <div
        className="
          flex
          items-center
          gap-2
          rounded-xl
          border
          border-gray-200
          bg-white
          px-4
          py-2.5
          shadow-sm
        "
      >
        <span className="text-sm text-gray-500">
          Нийт
        </span>

        <span className="font-bold text-gray-900">
          {wishlistProducts.length}
        </span>

        <span className="text-sm text-gray-500">
          бүтээгдэхүүн
        </span>
      </div>

    </div>

    {/* Bottom information bar */}
    <div
      className="
        mt-6
        flex
        flex-col
        gap-3
        rounded-xl
        border
        border-gray-200
        bg-white
        px-5
        py-4
        shadow-sm
        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50">
          ❤️
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-800">
            Дуртай бараагаа бүү алдаарай
          </p>

          <p className="text-xs text-gray-500">
            Wishlist-д хадгалсан бүтээгдэхүүнүүд энд харагдана.
          </p>
        </div>
      </div>

      <span className="text-xs text-gray-400">
        Шинэчилсэн жагсаалт
      </span>
    </div>

  </div>


  {/* =========================
      PRODUCTS
  ========================= */}
  <div
    className="
      mx-auto
      grid
      w-full
      max-w-7xl
      grid-cols-1
      gap-6
      px-4
      py-8
      sm:grid-cols-2
      sm:px-6
      lg:grid-cols-3
      lg:px-8
      xl:grid-cols-4
      justify-items-center
    "
  >
    {wishlistProducts.map((product) => (
      <ProductCard
        key={product._id}
        product={product}
      />
    ))}
  </div>

</div>
  );
};

export default Wishlist;