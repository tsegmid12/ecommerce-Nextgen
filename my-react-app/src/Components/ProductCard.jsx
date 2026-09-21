import heart from "../assets/heart.png";
import heart_full from "../assets/heart-full.png";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const ProductCard = ({ product, onRemove }) => {
  const [wishlist, setWishlist] = useState(false);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  // =========================
  // CHECK WISHLIST
  // =========================
  useEffect(() => {
    const checkWishlist = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setWishlist(false);
          console.log("Token not found. User might not be logged in.");
          return;
        }

        const response = await axios.get(`${API_URL}/api/wishlist`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const isWishlist = response.data.some(
          (item) =>
            item.productId?._id?.toString() === product._id?.toString()
        );

        setWishlist(isWishlist);
      } catch (error) {
        console.error(
          "Wishlist шалгах error:",
          error.response?.data || error.message
        );
      }
    };

    checkWishlist();
  }, [product._id]);

  // =========================
  // ADD TO CART
  // =========================
  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Та эхлээд нэвтэрнэ үү");
        return false;
      }

      if (product.count === 0) {
        alert("Энэ бүтээгдэхүүн дууссан байна");
        return false;
      }

      if (count >= product.count) {
        alert(
          `Үлдэгдэл хүрэлцэхгүй байна. Одоогийн үлдэгдэл: ${product.count}`
        );
        return false;
      }

      await axios.post(
        `${API_URL}/api/cart`,
        {
          userId: localStorage.getItem("userId"),
          productId: product._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCount((prev) => prev + 1);

      window.dispatchEvent(new Event("cartUpdated"));

      console.log(`Added ${product.name} to cart`);

      return true;
    } catch (error) {
      console.error(
        "Error adding to cart:",
        error.response?.data || error.message
      );

      const status = error.response?.status;

      if (status === 401) {
        alert("Таны нэвтрэлт хүчингүй байна. Дахин нэвтэрнэ үү");
        localStorage.removeItem("token");
      } else if (status === 404) {
        alert("Бүтээгдэхүүн олдсонгүй");
      } else {
        alert("Сагсанд нэмэхэд алдаа гарлаа");
      }

      return false;
    }
  };

  // =========================
  // BUY NOW
  // =========================
  const handleBuyNow = async () => {
    const success = await handleAddToCart();

    if (success) {
      navigate("/cart");
    }
  };

  // =========================
  // ADD TO WISHLIST
  // =========================
  const handleAddToWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Та эхлээд нэвтэрнэ үү");
        return;
      }

      await axios.post(
        `${API_URL}/api/wishlist`,
        {
          productId: product._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setWishlist(true);
    } catch (error) {
      console.error(
        "Error adding to wishlist:",
        error.response?.data || error.message
      );

      const status = error.response?.status;

      if (status === 400) {
        alert(
          error.response?.data?.message ||
            "Энэ бараа wishlist-д аль хэдийн байна"
        );
      } else if (status === 401) {
        alert("Таны нэвтрэлт хүчингүй байна. Дахин нэвтэрнэ үү");
        localStorage.removeItem("token");
      } else {
        alert("Wishlist-д нэмэхэд алдаа гарлаа");
      }
    }
  };

  // =========================
  // REMOVE FROM WISHLIST
  // =========================
  const handleRemoveFromWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Та эхлээд нэвтэрнэ үү");
        return;
      }

      await axios.delete(`${API_URL}/api/wishlist`, {
        data: {
          productId: product._id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWishlist(false);

      if (onRemove) {
        onRemove(product._id);
      }
    } catch (error) {
      console.error(
        "Error removing from wishlist:",
        error.response?.data || error.message
      );

      const status = error.response?.status;

      if (status === 401) {
        alert("Таны нэвтрэлт хүчингүй байна. Дахин нэвтэрнэ үү");
        localStorage.removeItem("token");
      } else if (status === 404) {
        alert("Энэ бараа wishlist-д байхгүй байна");
      } else {
        alert("Wishlist-аас устгахад алдаа гарлаа");
      }
    }
  };

  // =========================
  // WISHLIST TOGGLE
  // =========================
  const handleWishlist = async () => {
    if (wishlist) {
      await handleRemoveFromWishlist();
    } else {
      await handleAddToWishlist();
    }
  };

  return (
    <div className="group relative w-full max-w-sm overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:rounded-2xl">

      {/* =========================
          PRODUCT IMAGE
      ========================= */}
      <div className="relative mx-2 mt-2 flex h-36 items-center justify-center overflow-hidden rounded-lg bg-white transition-all duration-500 group-hover:scale-105 sm:mx-3 sm:mt-3 sm:h-56 sm:rounded-xl md:h-72 lg:h-80">

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlist}
          className="absolute right-2 top-2 z-20 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white shadow-md transition-all duration-200 hover:scale-110 hover:shadow-lg sm:right-3 sm:top-3 sm:h-10 sm:w-10"
        >
          <img
            src={wishlist ? heart_full : heart}
            alt={
              wishlist
                ? "Remove from wishlist"
                : "Add to wishlist"
            }
            className="h-4 w-4 sm:h-5 sm:w-5"
          />
        </button>

        {/* Product Image */}
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="h-28 w-full object-contain transition-transform duration-500 group-hover:scale-105 sm:h-40 md:h-48"
          />
        </Link>
      </div>

      {/* =========================
          PRODUCT INFO
      ========================= */}
      <div className="px-2.5 pb-3 pt-2 sm:px-4 sm:pb-4 sm:pt-3">

        {/* Product Name */}
        <h2 className="min-h-6 truncate text-sm font-semibold text-gray-800 sm:min-h-7 sm:text-base">
          {product.name}
        </h2>

        {/* Price + Stock */}
        <div className="mt-1 flex items-center justify-between gap-1">
          <p className="text-base font-bold text-gray-900 sm:text-xl">
            {product.price?.toLocaleString()}₮
          </p>

          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-medium sm:px-2.5 sm:py-1 sm:text-xs ${
              product.count > 0
                ? "bg-green-50 text-green-600"
                : "bg-red-50 text-red-600"
            }`}
          >
            {product.count > 0 ? "Бэлэн" : "Дууссан"}
          </span>
        </div>

        {/* Divider */}
        <div className="my-2 border-t border-gray-100 sm:my-3"></div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-1.5 sm:gap-2">

          {/* Add to Cart */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={count >= product.count || product.count === 0}
            className="cursor-pointer rounded-lg border border-gray-300 bg-white h-8 sm:h-12 text-xs font-semibold text-gray-700 transition hover:bg-gray-100 hover:shadow-sm active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:rounded-xl sm:py-2.5 sm:text-sm"
          >
            Сагслах
          </button>

          {/* Buy Now */}
          <button
            type="button"
            disabled={count >= product.count || product.count === 0}
            onClick={handleBuyNow}
            className="cursor-pointer rounded-lg bg-green-600 h-8 sm:h-12 text-xs font-semibold text-white transition hover:bg-green-500 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:rounded-xl sm:py-2.5 sm:text-sm"
          >
            Худалдан авах
          </button>

        </div>
      </div>
    </div>
  );
};

export default ProductCard;