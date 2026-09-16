import React from "react";
import CartList from "./CartList";

const Cart = () => {
  return (
  <div className="min-h-screen bg-[#f7f7f7] pb-12 pt-24 sm:pb-20 sm:pt-32">

    {/* Page Header */}
    <div className="mx-auto w-full max-w-7xl pt-16 px-4 sm:px-6 lg:px-8">
      
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        
        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
            Миний сагс
          </h1>

          <div className="mt-2 h-1 w-12 rounded-full bg-blue-500 sm:w-14"></div>
        </div>

        {/* Subtitle */}
        <span className="w-fit rounded-full bg-white px-3 py-1.5 text-xs font-medium text-gray-500 shadow-sm sm:px-4 sm:py-2 sm:text-sm">
          Таны сонгосон бүтээгдэхүүнүүд
        </span>

      </div>
    </div>

    {/* Cart */}
    <div className="mx-auto mt-6 w-full max-w-7xl px-3 sm:mt-8 sm:px-6 lg:px-8">
      <CartList />
    </div>

  </div>
  );
};

export default Cart;