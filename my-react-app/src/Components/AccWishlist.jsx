import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;


const AccWishlist = ({ active }) => {
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.log("Token байхгүй байна");
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

        const products = response.data
          .map((item) => item.productId)
          .filter((product) => product);

        setWishlist(products);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  if (active !== 1) {
    return null;
  }

  const handleBuyNow = (product) => {
    navigate("/payment", {
      state: {
        type: "buyNow",
        productId: product._id,
        quantity: 1,
      },
    });
  };

  return (
    <div className="space-y-4 py-4">
      {/* Loading */}
      {loading ? (
        <div className="flex min-h-62.5 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-black" />
        </div>
      ) : wishlist.length === 0 ? (
        /* Empty */
        <div className="rounded-2xl border border-gray-200 bg-white px-6 py-12 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-2xl">
            ♡
          </div>

          <h3 className="font-semibold text-gray-800">
            Хүслийн жагсаалт хоосон байна
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Таалагдсан бүтээгдэхүүнээ энд хадгалаарай.
          </p>

          <button
            onClick={() => navigate("/shop")}
            className="mt-5 rounded-lg bg-green-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-600"
          >
            Дэлгүүр үзэх
          </button>
        </div>
      ) : (
        wishlist.map((product) => (
          <div
            key={product._id}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
          >
            {/* Product */}
            <div className="flex gap-4 px-5 py-5 sm:px-6">
              {/* Image */}
              <div
                onClick={() => navigate(`/product/${product._id}`)}
                className="h-24 w-24 shrink-0 cursor-pointer overflow-hidden rounded-xl"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-contain p-2 transition duration-300 hover:scale-105"
                />
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <p className="mb-1 text-xs text-gray-500">
                  {product.category || "Бараа"}
                </p>

                <h3
                  onClick={() => navigate(`/product/${product._id}`)}
                  className="cursor-pointer truncate font-semibold text-gray-800 hover:text-gray-500"
                >
                  {product.name}
                </h3>

                <p className="mt-2 font-medium text-gray-700">
                  {product.price?.toLocaleString()}₮
                </p>

                <p
                  className={`mt-1 text-xs font-medium ${
                    product.count > 0
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {product.count > 0
                    ? "Бараа бэлэн"
                    : "Бараа дууссан"}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 px-5 py-2 sm:px-6">
              <div>
                <p className="text-xs text-gray-500">
                  Хадгалсан бараа
                </p>
              </div>

              <button
                onClick={() => handleBuyNow(product)}
                disabled={!product.count || product.count <= 0}
                className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition ${
                  product.count > 0
                    ? "bg-green-500 text-white hover:bg-green-600 hover:-translate-y-0.5"
                    : "cursor-not-allowed bg-gray-200 text-gray-400"
                }`}
              >
                {product.count > 0
                  ? "Худалдаж авах"
                  : "Бараа дууссан"}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AccWishlist;