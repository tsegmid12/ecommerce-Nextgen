import React from "react";
import ProductList from "./ProductList.jsx";
import Categore from "./Categore.jsx";

const Mouse = () => {
  return (
    <div className="min-h-screen bg-[#f7f7f7] pt-40">
      <Categore />
      <h1 className="text-3xl font-bold mt-10 ml-30">Mouse</h1>
      <ProductList defaultCategory="mouse" showFilter={false} />
    </div>
  );
};

export default Mouse;
