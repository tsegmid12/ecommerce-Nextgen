import React from "react";
import ProductList from "./ProductList.jsx";
import Categore from "./Categore.jsx";

const Mouse = () => {
  return (
    <div className="min-h-screen bg-[#f7f7f7] pt-28 pb-20 sm:pt-32">

      {/* Categories */}
        <Categore />

      {/* Page Header */}
      <div className="mx-auto mt-10 flex w-full max-w-7xl items-end justify-between px-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
            Mouse
          </h1>

          <div className="mt-2 h-1 w-14 rounded-full bg-blue-500"></div>
        </div>


      </div>

      {/* Products */}
      <ProductList
        defaultCategory="mouse"
        showFilter={false}
      />

    </div>
  );
};

export default Mouse;