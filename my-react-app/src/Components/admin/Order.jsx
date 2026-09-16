import React from 'react'
import {useEffect, useState} from "react";
import axios from "axios";

const Order = () => {
    const [orders, setOrders] = useState([]);
useEffect(() => {
    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.log("Token байхгүй байна");
                return;
            }

            const response = await axios.get("http://localhost:5000/api/admin/orders", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            setOrders(response.data)
        }
        catch (error) {
            console.error("Error fetching orders:", error);
    }
    }
    fetchOrders()
},[])

  return (
<div className="min-h-screen bg-gray-50 px-4 py-30 sm:px-6 lg:px-8">
  <div className="mx-auto max-w-5xl space-y-6">

    {orders.map((order) => (
      <div
        onClick={() => window.location.href = `/admin/orders/${order._id}`}
        key={order._id}
        className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
      >
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-gray-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Захиалгын ID
            </p>

            <h2 className="mt-1 font-semibold text-gray-900">
              #{order._id.slice(-8)}
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            <span
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                order.paymentStatus === "paid"
                  ? "bg-green-50 text-green-600"
                  : order.paymentStatus === "failed"
                  ? "bg-red-50 text-red-600"
                  : order.paymentStatus === "refunded"
                  ? "bg-purple-50 text-purple-600"
                  : "bg-yellow-50 text-yellow-600"
              }`}
            >
              {order.paymentStatus === "paid"
                ? "Төлөгдсөн"
                : order.paymentStatus === "failed"
                ? "Амжилтгүй"
                : order.paymentStatus === "refunded"
                ? "Буцаагдсан"
                : "Хүлээгдэж байна"}
            </span>

            <span
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                order.orderStatus === "delivered"
                  ? "bg-green-50 text-green-600"
                  : order.orderStatus === "shipped"
                  ? "bg-blue-50 text-blue-600"
                  : order.orderStatus === "cancelled"
                  ? "bg-red-50 text-red-600"
                  : "bg-yellow-50 text-yellow-600"
              }`}
            >
              {order.orderStatus === "delivered"
                ? "Хүргэгдсэн"
                : order.orderStatus === "shipped"
                ? "Хүргэлтэнд"
                : order.orderStatus === "cancelled"
                ? "Цуцлагдсан"
                : "Бэлтгэж байна"}
            </span>
          </div>
        </div>

        {/* Information */}
        <div className="grid grid-cols-1 gap-px bg-gray-100 sm:grid-cols-2 lg:grid-cols-4">
          
          <div className="bg-white p-5">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-gray-400">
              Хэрэглэгч
            </p>

            <div className="space-y-1.5">
              <p className="font-semibold text-gray-900">
                {order.userId?.username || "-"}
              </p>

              <p className="truncate text-sm text-gray-500">
                {order.userId?.email || "-"}
              </p>

              <p className="text-sm text-gray-500">
                {order.userId?.phone || "-"}
              </p>

              <p className="text-sm text-gray-500">
                {order.userId?.address || "-"}
              </p>
            </div>
          </div>

          <div className="bg-white p-5">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-gray-400">
              Захиалсан огноо
            </p>

            <p className="font-semibold text-gray-800">
              {new Date(order.createdAt).toLocaleDateString("mn-MN")}
            </p>

            <p className="mt-1 text-sm text-gray-400">
              {new Date(order.createdAt).toLocaleTimeString("mn-MN", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          <div className="bg-white p-5">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-gray-400">
              Шинэчлэгдсэн
            </p>

            <p className="font-semibold text-gray-800">
              {new Date(order.updatedAt).toLocaleDateString("mn-MN")}
            </p>

            <p className="mt-1 text-sm text-gray-400">
              {new Date(order.updatedAt).toLocaleTimeString("mn-MN", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          <div className="bg-white p-5">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-gray-400">
              Нийт дүн
            </p>

            <p className="text-2xl font-bold text-gray-900">
              {order.totalAmount?.toLocaleString()}₮
            </p>
          </div>
        </div>

        {/* Description */}
        {order.description && (
          <div className="border-b border-gray-100 px-6 py-5">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
              Тайлбар
            </p>

            <p className="text-sm text-gray-600">
              {order.description}
            </p>
          </div>
        )}

        {/* Products */}
        <div className="px-6 py-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">
                Захиалсан бараа
              </h3>

              <p className="mt-1 text-sm text-gray-400">
                {order.products?.length || 0} бүтээгдэхүүн
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {order.products?.map((product) => (
              <div
                key={product._id}
                className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 transition hover:border-gray-200 hover:bg-gray-50"
              >
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                  <img
                    src={product.productId?.image}
                    alt={product.productId?.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="truncate font-semibold text-gray-800">
                    {product.productId?.name}
                  </h4>

                  <p className="mt-1 text-sm text-gray-500">
                    {product.productId?.price?.toLocaleString()}₮ / ширхэг
                  </p>
                </div>

                <div className="hidden text-center sm:block">
                  <p className="text-xs text-gray-400">
                    Тоо
                  </p>

                  <p className="mt-1 font-semibold text-gray-800">
                    {product.quantity || 1}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-gray-400">
                    Үнэ
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {product.price?.toLocaleString()}₮
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 px-6 py-5">
          <div>
            <p className="text-sm text-gray-500">
              Нийт төлбөр
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Захиалгын нийт дүн
            </p>
          </div>

          <p className="text-2xl font-bold text-gray-900">
            {order.totalAmount?.toLocaleString()}₮
          </p>
        </div>
      </div>
    ))}

  </div>
</div>
  )
}

export default Order
