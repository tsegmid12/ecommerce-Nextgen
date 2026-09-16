import React, { useState, useEffect } from "react";
import axios from "axios";
import Shipping from "./Shipping.jsx";
import Delivered from "./Delivered.jsx";
import Cancelled from "./Cancelled.jsx";

const API_URL = import.meta.env.API_URL;


const MyOrder = ({ active }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.log("Token байхгүй байна");
          return;
        }

        const response = await axios.get(
          `${API_URL}/api/orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Orders:", response.data);

        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Account дээр "Миний захиалга" сонгогдоогүй бол
  if (active !== 2) {
    return null;
  }

  // Loading
  if (loading) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-500">
          Захиалгуудыг уншиж байна...
        </p>
      </div>
    );
  }

  // Order байхгүй
  if (orders.length === 0) {
    return (
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-50 items-center justify-center rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
          <h1 className="text-md font-semibold text-gray-600 sm">
            Та одоогоор захиалга хийгээгүй байна.
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
      
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">

        {/* Title */}
        <h1 className="text-xl font-semibold text-gray-800">
          Миний захиалга
        </h1>

        {/* Tabs */}
        <div className="mt-4 flex gap-2 rounded-2xl border border-gray-200 p-2">

          <button
            type="button"
            onClick={() => setActiveTab(0)}
            className={`flex-1 rounded-xl py-2 text-xs font-medium  sm:text-sm lg:text:md transition ${
              activeTab === 0
                ? "bg-gray-100 text-gray-800"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            Хүргэгдэж байгаа
          </button>

          <button
            type="button"
            onClick={() => setActiveTab(1)}
            className={`flex-1 rounded-xl py-2 text-xs font-medium  sm:text-sm lg:text:md transition ${
              activeTab === 1
                ? "bg-gray-100 text-gray-800"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            Хүргэгдсэн
          </button>

          <button
            type="button"
            onClick={() => setActiveTab(2)}
            className={`flex-1 rounded-xl py-2 text-xs font-medium  sm:text-sm lg:text:md transition ${
              activeTab === 2
                ? "bg-gray-100 text-gray-800"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            Цуцлагдсан
          </button>

        </div>

        {/* Orders */}
        <div className="mt-5">
          <Shipping
            activeTab={activeTab}
          />
          <Delivered
            activeTab={activeTab}
          />
          <Cancelled
            activeTab={activeTab}
          />
        </div>

      </div>
    </div>
  );
};

export default MyOrder;