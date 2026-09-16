import heart from "../assets/heart.png";
import heart_full from "../assets/heart-full.png";
import { useState, useEffect } from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

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

        const response = await axios.get(
          `${API_URL}/api/wishlist`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const isWishlist = response.data.some(
          (item) =>
            item.productId?._id?.toString() ===
            product._id?.toString()
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
        return;
      }

      if(product.count === 0){
        alert("Энэ бүтээгдэхүүн дууссан байна");
        return;
      }
        await axios.post(`${API_URL}/api/cart`,
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
      setCount((prev) => (prev) + 1);
      window.dispatchEvent(new Event("cartUpdated"));

      console.log(`Added ${count} of ${product.name} to cart`);
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

      await axios.delete(
        `${API_URL}/api/wishlist`,
        {
          data: {
            productId: product._id,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setWishlist(false);

      // Wishlist page дээр байвал card-ийг шууд арилгана
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
    <div className="group relative w-full max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Product Image */}
      <div className="relative mx-3 mt-3 flex h-56 items-center justify-center overflow-hidden rounded-xl bg-white transition-all duration-750 group-hover:scale-105 sm:h-64 md:h-72 lg:h-80">

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlist}
          className="absolute right-3 top-3 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white shadow-md transition-all duration-200 hover:scale-110 hover:shadow-lg"
        >
          <img
            src={wishlist ? heart_full : heart}
            alt={wishlist ? "Remove from wishlist" : "Add to wishlist"}
            className="h-5 w-5"
          />
        </button>

        {/* Product Image */}
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="h-48 w-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
      </div>

      {/* Product Info */}
      <div className="px-4 pb-4 pt-3">

        {/* Name */}
        <h2 className="min-h-7 truncate text-base font-semibold text-gray-800">
          {product.name}
        </h2>

        {/* Price + Stock */}
        <div className="mt-1 flex items-center justify-between">
          <p className="text-xl font-bold text-gray-900">
            {product.price?.toLocaleString()}₮
          </p>
          <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${product.count > 0 ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
            {product.count > 0 ? "Бэлэн" : "Дууссан"}
          </span>
        </div>

        {/* Divider */}
        <div className="my-3 border-t border-gray-100"></div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2">

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={count >= product.count}
            className="cursor-pointer rounded-xl border active:scale-90 border-gray-300 bg-white py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 hover:shadow-sm"
          >
            Сагслах
          </button>

          <button
            type="button"
            disabled={count >= product.count}
            onClick={() => {handleAddToCart(); navigate(`/cart`)}}
            className="cursor-pointer rounded-xl bg-green-600 py-2.5 text-sm font-semibold text-white transition hover:bg-green-500 hover:shadow-md"
          >
            Худалдан авах
          </button>

        </div>
      </div>
    </div>
  );
};

export default ProductCard;