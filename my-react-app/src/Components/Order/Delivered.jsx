import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Delivered = ({ activeTab }) => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.log("Token байхгүй байна");
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/api/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  if (activeTab !== 1) {
    return null;
  }

  // Зөвхөн processing болон shipped захиалгууд
  const shippingOrders = orders.filter(
    (order) =>
      order.orderStatus === "delivered"
  );

  return (
    <div className="space-y-4 py-4">
      {shippingOrders.length === 0 ? (
        <p className="py-10 text-center text-gray-500">
          Хүргэлтийн захиалга байхгүй байна.
        </p>
      ) : (
        shippingOrders.map((order) => (
          <div
            key={order._id}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
          >
            {/* Order header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 sm:px-6">
              <div>
                <p className="text-xs text-gray-500 sm:text-sm">
                  Захиалгын огноо
                </p>

                <p className="font-medium text-gray-800">
                  {new Date(order.createdAt).toLocaleDateString("mn-MN")}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                  order.orderStatus === "delivered"
                    ? "bg-green-50 text-green-600"
                    : "bg-yellow-50 text-yellow-600"
                }`}
              >
                {order.orderStatus === "delivered"
                  ? "Хүргэгдсэн"
                  : "Бэлтгэж байна"}
              </span>
            </div>

            {/* Products */}
            <div className="divide-y divide-gray-100 px-5 sm:px-6">
              {order.products.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center gap-4 py-4"
                >
                  {/* Product image */}
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                    <img
                      onClick={() => navigate(`/product/${product.productId?._id}`)}
                      src={product.productId?.image}
                      alt={product.productId?.name}
                      className="h-full w-full object-cover cursor-pointer"
                    />
                  </div>

                  {/* Product info */}
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">
                      {product.productId?.name}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Бараа
                    </p>

                    <p className="mt-1 font-medium text-gray-700">
                      {product.productId?.price?.toLocaleString()}₮

                      {product.quantity > 0 && (
                        <span className="ml-2 text-sm font-normal text-gray-500">
                          x{product.quantity}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 px-5 py-4 sm:px-6">
              <span className="text-sm text-gray-500">
                Нийт төлбөр
              </span>

              <span className="text-lg font-bold text-gray-900">
                {order.totalAmount?.toLocaleString()}₮
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Delivered;