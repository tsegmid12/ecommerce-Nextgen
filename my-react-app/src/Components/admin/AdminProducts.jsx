import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const AdminProducts = () => {
    const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Token олдсонгүй. Дахин login хийнэ үү.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `${API_URL}/api/products`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("API response:", response.data);

        // API response.products байхгүй тохиолдолд
        // шууд array response байсан ч ажиллана
        const productData = Array.isArray(response.data)
          ? response.data
          : response.data.products || [];

        setProducts(productData);
      } catch (err) {
        console.error("Products fetch error:", err);

        setError(
          err.response?.data?.message ||
            "Бүтээгдэхүүн татах үед алдаа гарлаа."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Delete function
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Энэ бүтээгдэхүүнийг устгах уу?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${API_URL}/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
    } catch (err) {
      console.error("Delete error:", err);

      alert(
        err.response?.data?.message ||
          "Бүтээгдэхүүн устгах үед алдаа гарлаа."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-40">
      {/* ================= HEADER ================= */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Products
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Бүтээгдэхүүнүүдээ удирдах
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/admin/addproduct")}
              className="rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              + Add Product
            </button>

          </div>
        </div>
      </div>

      {/* ================= MAIN ================= */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        {/* ================= ERROR ================= */}
        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-600">
              {error}
            </p>
          </div>
        )}

        {/* ================= STAT CARD ================= */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Нийт бүтээгдэхүүн
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {products.length}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Бэлэн бүтээгдэхүүн
            </p>

            <p className="mt-2 text-3xl font-bold text-green-600">
              {
                products.filter(
                  (product) => Number(product.count) > 0
                ).length
              }
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Дууссан бүтээгдэхүүн
            </p>

            <p className="mt-2 text-3xl font-bold text-red-600">
              {
                products.filter(
                  (product) => Number(product.count) <= 0
                ).length
              }
            </p>
          </div>

        </div>

        {/* ================= LOADING ================= */}
        {loading && (
          <div className="rounded-xl bg-white p-12 text-center shadow-sm">
            
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-black"></div>

            <p className="mt-4 text-sm text-gray-500">
              Products loading...
            </p>

          </div>
        )}

        {/* ================= EMPTY ================= */}
        {!loading && !error && products.length === 0 && (
          <div className="rounded-xl bg-white p-12 text-center shadow-sm">
            
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <span className="text-2xl">
                📦
              </span>
            </div>

            <h2 className="mt-4 text-lg font-semibold text-gray-900">
              No products
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Одоогоор бүтээгдэхүүн байхгүй байна.
            </p>

          </div>
        )}

        {/* ================= DESKTOP TABLE ================= */}
        {!loading && products.length > 0 && (
          <div className="hidden overflow-hidden rounded-xl bg-white shadow-sm md:block">

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="border-b bg-gray-50">

                  <tr>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Product
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Category
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Price
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Stock
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Зарагдсан
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Status
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-gray-100">

                  {products.map((product) => {

                    const stock = Number(product.count) || 0;
                    const soldCount = Number(product.sold) || 0;

                    return (
                      <tr
                        key={product._id}
                        className="transition hover:bg-gray-50"
                      >

                        {/* PRODUCT */}
                        <td className="px-6 py-4">

                          <div className="flex items-center gap-4">

                            {/* Image placeholder */}
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-100">

                              {product.image ? (
                                <img
                                  src={product.image}
                                  alt={product.name || "Product"}
                                  className="h-full w-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.style.display =
                                      "none";
                                  }}
                                />
                              ) : (
                                <span className="text-xl">
                                  📦
                                </span>
                              )}

                            </div>

                            <div className="min-w-0">

                              <p className="truncate font-semibold w-60 text-gray-900">
                                {product.name || "Unnamed Product"}
                              </p>

                              <p className="mt-1 max-w-xs truncate text-xs text-gray-400">
                                ID: {product._id}
                              </p>

                            </div>

                          </div>

                        </td>

                        {/* CATEGORY */}
                        <td className="px-6 py-4">

                          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                            {product.category || "Unknown"}
                          </span>

                        </td>

                        {/* PRICE */}
                        <td className="px-6 py-4">

                          <span className="font-semibold text-gray-900">
                            {Number(product.price || 0).toLocaleString()}₮
                          </span>

                        </td>

                        {/* STOCK */}
                        <td className="px-10 py-4">

                          <span className="font-medium text-gray-700">
                            {stock}
                          </span>

                        </td>
                        
                        <td className="px-12 py-4">
                            <span className="font-medium text-gray-700">
                                {soldCount}
                            </span>
                        </td>

                        {/* STATUS */}
                        <td className="px-6 py-4">

                          {stock > 0 ? (
                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                              In Stock
                            </span>
                          ) : (
                            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                              Out of Stock
                            </span>
                          )}

                        </td>

                        {/* ACTION */}
                        <td className="px-6 py-4">

                          <div className="flex justify-end gap-2">

                            <button
                              type="button"
                              onClick={() => navigate(`/admin/products/edit/${product._id}`)}
                              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleDelete(product._id)
                              }
                              className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
                            >
                              Delete
                            </button>

                          </div>

                        </td>

                      </tr>
                    );
                  })}

                </tbody>

              </table>

            </div>

          </div>
        )}

        {/* ================= MOBILE ================= */}
        {!loading && products.length > 0 && (
          <div className="space-y-4 md:hidden">

            {products.map((product) => {

              const stock = Number(product.stock) || 0;

              return (
                <div
                  key={product._id}
                  className="rounded-xl bg-white p-4 shadow-sm"
                >

                  {/* PRODUCT */}
                  <div className="flex gap-4">

                    <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-100">

                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name || "Product"}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <span className="text-2xl">
                          📦
                        </span>
                      )}

                    </div>

                    <div className="min-w-0 flex-1">

                      <h2 className="truncate font-semibold text-gray-900">
                        {product.name || "Unnamed Product"}
                      </h2>

                      <p className="mt-1 text-sm text-gray-500">
                        {product.category || "Unknown"}
                      </p>

                      <p className="mt-2 font-bold text-gray-900">
                        {Number(product.price || 0).toLocaleString()}₮
                      </p>

                    </div>

                  </div>

                  {/* INFO */}
                  <div className="mt-4 grid grid-cols-2 gap-4 border-t pt-4">

                    <div>
                      <p className="text-xs text-gray-400">
                        Stock
                      </p>

                      <p className="mt-1 font-semibold text-gray-800">
                        {stock}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">
                        Status
                      </p>

                      <div className="mt-1">

                        {stock > 0 ? (
                          <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                            In Stock
                          </span>
                        ) : (
                          <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700">
                            Out of Stock
                          </span>
                        )}

                      </div>
                    </div>

                  </div>

                  {/* BUTTONS */}
                  <div className="mt-4 flex gap-2">

                    <button
                      type="button"
                      className="flex-1 rounded-lg border border-gray-200 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(product._id)
                      }
                      className="flex-1 rounded-lg bg-red-50 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                    >
                      Delete
                    </button>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </main>
    </div>
  );
};

export default AdminProducts;
