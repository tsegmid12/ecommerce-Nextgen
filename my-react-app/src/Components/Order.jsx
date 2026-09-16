
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Order = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [products, setProducts] = useState(location.state?.products || []);
  const [totalAmount, setTotalAmount] = useState(location.state?.totalAmount || 0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [description, setDescription] = useState(location.state?.description || "");

  const user = localStorage.getItem("user");
  const userId = user ? JSON.parse(user)._id : null;
  const token = localStorage.getItem("token");


  const handlePayment = async (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      alert("Төлбөрийн хэрэгсэл сонгоно уу");
      return;
    }

    await axios.post("http://localhost:5000/api/order",{
      userId: userId,
      products,
      description: description,
      totalAmount: totalAmount
    },
    {
      headers: {
        "Authorization": `Bearer ${token}`
      },

    })
    
    window.dispatchEvent(new Event("cartUpdated"));
    navigate("/home")
  }

  return (
    <div className="min-h-screen bg-gray-50 py-40">
      <div className="mx-auto max-w-xl rounded-xl bg-white  p-8 shadow-md">
        <h1 className="mb-8 text-center text-3xl font-bold">
          Төлбөрийн хэрэгсэл сонгох
        </h1>

        <div className="space-y-4">

          {/* QPay */}
          <label className="flex cursor-pointer items-center gap-4 rounded-lg border p-4 hover:bg-gray-50">
            <input
              type="radio"
              name="paymentMethod"
              value="qpay"
              checked={paymentMethod === "qpay"}
              onChange={(e) => setPaymentMethod(e.target.value)}  
            />

            <div>
              <h2 className="font-semibold">QPay</h2>
              <p className="text-sm text-gray-500">
                QPay ашиглан төлөх
              </p>
            </div>
          </label>

          {/* Bank */}
          <label className="flex cursor-pointer items-center gap-4 rounded-lg border p-4 hover:bg-gray-50">
            <input
              type="radio"
              name="paymentMethod"
              value="bank"
              checked={paymentMethod === "bank"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />

            <div>
              <h2 className="font-semibold">Банкны шилжүүлэг</h2>
              <p className="text-sm text-gray-500">
                Банкны дансаар төлөх
              </p>
            </div>
          </label>

          {/* Cash */}
          <label className="flex cursor-pointer items-center gap-4 rounded-lg border p-4 hover:bg-gray-50">
            <input
              type="radio"
              name="paymentMethod"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />

            <div>
              <h2 className="font-semibold">Бэлэн төлбөр</h2>
              <p className="text-sm text-gray-500">
                Хүргэлтээр төлөх
              </p>
            </div>
          </label>

        </div>

        <button
          onClick={handlePayment}
          className="mt-8 w-full rounded-lg bg-black py-3 font-semibold text-white transition hover:bg-gray-800"
        >
          Үргэлжлүүлэх
        </button>
      </div>
    </div>
  );
};

export default Order;

