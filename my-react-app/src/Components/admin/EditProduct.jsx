
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // =========================
  // GET PRODUCT
  // =========================
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:5000/api/product/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("API response:", response.data);

        const productData =
          response.data.product || response.data;

        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // UPDATE PRODUCT
  // =========================
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);

      const token = localStorage.getItem("token");

      const updateData = {
        name: product.name,
        image: product.image,
        price: Number(product.price),
        category: product.category.toLowerCase(),
        count: Number(product.count),
        status: product.status,
        sold: Number(product.sold || 0),
        description: product.description,
      };

      console.log("Sending update:", updateData);

      const response = await axios.put(
        `http://localhost:5000/api/product/${id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Updated product:", response.data);

      alert("Product амжилттай шинэчлэгдлээ!");

      navigate("/admin/products");
    } catch (error) {
      console.error("Error updating product:", error);

      alert(
        error.response?.data?.message ||
          "Product update хийхэд алдаа гарлаа."
      );
    } finally {
      setUpdating(false);
    }
  };

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f7f7]">
        <p className="text-gray-500">
          Loading...
        </p>
      </div>
    );
  }

  // =========================
  // NOT FOUND
  // =========================
  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f7f7]">
        <div className="text-center">

          <h1 className="text-xl font-bold text-gray-800">
            Product not found
          </h1>

          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="mt-4 rounded-lg bg-black px-5 py-2 text-white"
          >
            Back
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7] px-4 py-12">

      <div className="mx-auto max-w-3xl">

        {/* ================= HEADER ================= */}

        <div className="mb-6">

          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="mb-4 text-sm text-gray-500 hover:text-black"
          >
            ← Back to Products
          </button>

          <h1 className="text-3xl font-bold text-gray-900">
            Edit Product
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Бүтээгдэхүүний мэдээллийг засах
          </p>

        </div>

        {/* ================= FORM ================= */}

        <form
          onSubmit={handleUpdate}
          className="rounded-2xl bg-white p-6 shadow-sm sm:p-8"
        >

          {/* NAME */}

          <div className="mb-5">

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Product Name
            </label>

            <input
              type="text"
              name="name"
              value={product.name || ""}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
              placeholder="Product name"
              required
            />

          </div>

          {/* CATEGORY */}

          <div className="mb-5">

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Category
            </label>

        
            <select
            name="category"
            value={product.category || ""}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
            required
            >
            <option value="">Select category</option>
            <option value="Mouse">Mouse</option>
            <option value="Keyboard">Keyboard</option>
            <option value="Headset">Headset</option>
            <option value="Mousepad">Mousepad</option>
            <option value="Accessories">Accessories</option>
            </select>



          </div>

          {/* PRICE + COUNT */}

          <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">

            {/* PRICE */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Price
              </label>

              <input
                type="number"
                name="price"
                min="0"
                value={product.price ?? ""}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                placeholder="Price"
                required
              />

            </div>

            {/* COUNT */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Stock / Count
              </label>

              <input
                type="number"
                name="count"
                min="0"
                value={product.count ?? ""}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                placeholder="Count"
                required
              />

            </div>

          </div>

          {/* STATUS */}

          <div className="mb-5">

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Status
            </label>

            <select
              name="status"
              value={product.status || ""}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-black"
              required
            >
              <option value="">
                Select status
              </option>

              <option value="Шинэ">
                Шинэ
              </option>

              <option value="Хэрэглэж байсан">
                Хэрэглэж байсан
              </option>

              <option value="Бараг шинэ">
                Бараг шинэ
              </option>
            </select>

          </div>

          {/* SOLD */}

          <div className="mb-5">

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Sold
            </label>

            <input
              type="number"
              name="sold"
              min="0"
              value={product.sold ?? 0}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
              placeholder="Sold"
            />

          </div>

          {/* IMAGE */}

          <div className="mb-5">

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Image URL
            </label>

            <input
              type="text"
              name="image"
              value={product.image || ""}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
              placeholder="Image URL"
              required
            />

          </div>

          {/* IMAGE PREVIEW */}

          {product.image && (
            <div className="mb-6">

              <p className="mb-2 text-sm font-semibold text-gray-700">
                Image Preview
              </p>

              <div className="h-48 w-48 overflow-hidden rounded-xl bg-gray-100">

                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />

              </div>

            </div>
          )}

          {/* DESCRIPTION */}

          <div className="mb-6">

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Description
            </label>

            <textarea
              name="description"
              value={product.description || ""}
              onChange={handleChange}
              rows="5"
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
              placeholder="Product description"
              required
            />

          </div>

          {/* BUTTONS */}

          <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">

            {/* CANCEL */}

            <button
              type="button"
              onClick={() =>
                navigate("/admin/products")
              }
              className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>

            {/* UPDATE */}

            <button
              type="submit"
              disabled={updating}
              className="rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {updating
                ? "Updating..."
                : "Update Product"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default EditProduct;

