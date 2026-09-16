import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import heart from "../assets/heart.png";
import heart_full from "../assets/heart-full.png";

const API_URL = import.meta.env.API_URL;


const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [loading, setLoading] = useState(true);

  // =========================
  // GET PRODUCT
  // =========================
  useEffect(() => { 
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `${API_URL}/api/product/${id}`
        );

        setProduct(response.data);
      } catch (error) {
        console.error(
          "Product detail авах error:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // =========================
  // CHECK WISHLIST
  // =========================
  useEffect(() => {
    const checkWishlist = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token || !product?._id) return;

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
  }, [product]);

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

      if (product.count <= 0) {
        alert("Бараа дууссан байна");
        return;
      }

      if (quantity > product.count) {
        alert(`Зөвхөн ${product.count} ширхэг үлдсэн байна`);
        return;
      }

      await axios.post(
        "http://localhost:5000/api/cart",
        {
          userId: localStorage.getItem("userId"),
          productId: product._id,
          quantity: quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Бараа сагсанд нэмэгдлээ");
    } catch (error) {
      console.error(
        "Cart error:",
        error.response?.data || error.message
      );

      const status = error.response?.status;

      if (status === 401) {
        alert("Таны нэвтрэлт хүчингүй байна. Дахин нэвтэрнэ үү");
        localStorage.removeItem("token");
      } else if (status === 400) {
        alert(
          error.response?.data?.message ||
            "Нөөц хүрэлцэхгүй байна"
        );
      } else {
        alert("Сагсанд нэмэхэд алдаа гарлаа");
      }
    }
  };

  // =========================
  // WISHLIST
  // =========================
  const handleWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Та эхлээд нэвтэрнэ үү");
        return;
      }

      if (wishlist) {
        await axios.delete(
          "http://localhost:5000/api/wishlist",
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
      } else {
        await axios.post(
          "http://localhost:5000/api/wishlist",
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
      }
    } catch (error) {
      console.error(
        "Wishlist error:",
        error.response?.data || error.message
      );
    }
  };

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-gray-500">
          Бараа ачаалж байна...
        </div>
      </div>
    );
  }

  // =========================
  // NOT FOUND
  // =========================
  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Бараа олдсонгүй
          </h2>

          <p className="mt-2 text-gray-500">
            Таны хайсан бүтээгдэхүүн байхгүй байна.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-40">
      <div className="mx-auto max-w-6xl">

        {/* Main Card */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm">

          <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-2 md:p-10">

            {/* =========================
                PRODUCT IMAGE
            ========================= */}
            <div className="relative flex min-h-100 items-center justify-center rounded-2xl ">

              {/* Wishlist */}
              <button
                type="button"
                onClick={handleWishlist}
                className="absolute right-5 top-5 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition hover:scale-110 hover:shadow-md"
              >
                <img
                  src={wishlist ? heart_full : heart}
                  alt="wishlist"
                  className="h-6 w-6"
                />
              </button>

              <img
                src={product.image}
                alt={product.name}
                className="max-h-160 max-w-full object-contain p-8 transition duration-500 hover:scale-110"
              />
            </div>

            {/* =========================
                PRODUCT INFO
            ========================= */}
            <div className="flex flex-col justify-center">

              {/* Category */}
              {product.category && (
                <p className="mb-3 text-sm font-medium uppercase tracking-wider text-green-600">
                  {product.category}
                </p>
              )}

              {/* Name */}
              <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="mt-4 flex items-center gap-2">
                <div className="flex text-yellow-400">
                  ★★★★★
                </div>

                <span className="text-sm text-gray-500">
                  Үнэлгээ
                </span>
              </div>

              {/* Price */}
              <div className="mt-6">
                <p className="text-4xl font-bold text-gray-900">
                  {product.price?.toLocaleString()}₮
                </p>
              </div>

              {/* Divider */}
              <div className="my-6 border-t border-gray-100"></div>

              {/* Description */}
              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  Барааны тайлбар
                </h3>

                <p className="leading-7 text-gray-600 text-sm">
                  {product.description ||
                    "Энэ бүтээгдэхүүний тайлбар одоогоор байхгүй байна."}
                </p>
              </div>

              {/* Stock */}
              <div className="mt-6 flex items-center gap-3">
                <span className="font-medium text-gray-700">
                  Үлдэгдэл:
                </span>

                {product.count > 0 ? (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                    {product.count} ширхэг
                  </span>
                ) : (
                  <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">
                    Дууссан
                  </span>
                )}
              </div>

              {/* Quantity */}
              {product.count > 0 && (
                <div className="mt-6">
                  <p className="mb-2 font-medium text-gray-700">
                    Тоо ширхэг
                  </p>

                  <div className="flex w-fit items-center overflow-hidden rounded-xl border border-gray-300">

                    <button
                      type="button"
                      onClick={() =>
                        setQuantity((prev) =>
                          Math.max(1, prev - 1)
                        )
                      }
                      className="h-11 w-11 text-xl transition hover:bg-gray-100"
                    >
                      −
                    </button>

                    <span className="flex h-11 w-14 items-center justify-center border-x border-gray-300 font-semibold">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        setQuantity((prev) =>
                          Math.min(product.count, prev + 1)
                        )
                      }
                      className="h-11 w-11 text-xl transition hover:bg-gray-100"
                    >
                      +
                    </button>

                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="mt-8 flex gap-3">

                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={product.count <= 0}
                  className="flex-1 rounded-xl bg-green-600 py-3.5 font-semibold text-white transition hover:bg-green-500 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  {product.count > 0
                    ? "Сагсанд нэмэх"
                    : "Бараа дууссан"}
                </button>

                <button
                  type="button"
                  onClick={handleWishlist}
                  className="flex h-14 w-14 items-center justify-center rounded-xl border border-gray-300 bg-white transition hover:bg-gray-50"
                >
                  <img
                    src={wishlist ? heart_full : heart}
                    alt="wishlist"
                    className="h-6 w-6"
                  />
                </button>

              </div>

            </div>
          </div>
        </div>

        {/* =========================
            EXTRA INFORMATION
        ========================= */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="text-2xl">🚚</div>
            <h3 className="mt-3 font-semibold">
              Хүргэлт
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Улаанбаатар хот дотор хүргэлттэй
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="text-2xl">✓</div>
            <h3 className="mt-3 font-semibold">
              Баталгаатай
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Чанарын баталгаатай бүтээгдэхүүн
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="text-2xl">↻</div>
            <h3 className="mt-3 font-semibold">
              Буцаалт
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Нөхцөлийн дагуу буцаах боломжтой
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductDetail;
