import React, { useState } from "react";
import userIcon from "../assets/user.png";
import Acc_comp from "./acc_comp.jsx";
import Order from "./Order/MyOrder.jsx";
import AccWishlist from "./AccWishlist.jsx";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("phone");
    localStorage.removeItem("address");
    navigate("/home");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] px-4 pb-20 pt-40 sm:px-6 sm:pt-40 lg:px-8">

      <div className="mx-auto  flex w-full max-w-7xl flex-col gap-6 lg:flex-row">

        {/* Sidebar */}
        <div className="w-ful h-100 shrink-0 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm lg:w-72 lg:p-6">

          {/* User */}
          <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
              <img
                src={userIcon}
                alt="User"
                className="h-7 w-7"
              />
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Тавтай морил
              </p>

              <h2 className="text-lg font-bold text-gray-800">
                Хэрэглэгч
              </h2>
            </div>
          </div>

          {/* Menu */}
          <div className="mt-5 flex flex-col gap-2">

            <button
              type="button"
              onClick={() => setActive(0)}
              className={`w-full cursor-pointer rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                active === 0
                  ? "bg-blue-50 font-bold text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              👤 Хувийн мэдээлэл
            </button>

            <button
              type="button"
              onClick={() => setActive(1)}
              className={`w-full cursor-pointer rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                active === 1
                  ? "bg-blue-50 font-bold text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              ❤️ Хадгалсан бараа
            </button>

            <button
              type="button"
              onClick={() => setActive(2)}
              className={`w-full cursor-pointer rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                active === 2
                  ? "bg-blue-50 font-bold text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              📦 Миний захиалга
            </button>

            <div className="my-2 border-t border-gray-100"></div>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full cursor-pointer rounded-xl px-4 py-3 text-left text-sm font-medium text-red-500 transition hover:bg-red-50"
            >
              🚪 Гарах
            </button>

          </div>
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <Acc_comp
            active={active}
          />
          <Order
            active={active}
          />
          <AccWishlist
            active={active}
          />
        </div>

      </div>
    </div>
  );
};

export default Account;