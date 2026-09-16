import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orderStatus, setOrderStatus] = useState("processing");
  const [paymentStatus, setPaymentStatus] = useState("pending");

  const handleUpdate = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token not found in localStorage");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/admin/orders/${id}`,
        {
          paymentStatus,
          orderStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Updated order:", response.data);
      alert("Захиалга шинэчлэгдлээ");
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-30 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-md flex-col gap-5 rounded-2xl bg-white p-6 shadow-sm">

        {/* Order status */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Захиалгын төлөв
          </label>

          <select
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-gray-400"
          >
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Payment status */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Төлбөрийн төлөв
          </label>

          <select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-gray-400"
          >
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>

        <button
          onClick={(e) => {handleUpdate(e); navigate("/admin/orders");}}
          className="rounded-xl bg-black px-5 py-3 font-semibold text-white transition hover:bg-gray-800"
        >
          Update
        </button>

      </div>
    </div>
  );
};

export default OrderDetail;