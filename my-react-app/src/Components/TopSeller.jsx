import React from 'react'
import products from '../data/product'
import ProductCard from './ProductCard'
import { useState, useEffect } from "react";
import axios from "axios";

const TopSeller = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products").then((response) => {
      setProducts(response.data);
    })
  }, []);

    const sortedProducts = [...products].sort((a, b) => b.sold - a.sold).slice(0, 4);
    
  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 py-10">

  {/* Section Header */}
  <div className="flex items-center justify-between mb-8">
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
        Эрэлттэй бүтээгдэхүүн
      </h1>

      <div className="w-16 h-1 bg-blue-500 rounded-full mt-3"></div>
    </div>

    <button
      onClick={() => navigate("/shop")}
      className="hidden sm:block
                 text-sm font-semibold text-blue-500
                 hover:text-blue-700
                 transition"
    >
      Бүгдийг харах →
    </button>
  </div>


  {/* Products */}
  <div
    className="grid
               grid-cols-1
               sm:grid-cols-2
               lg:grid-cols-3
               xl:grid-cols-4
               gap-5 lg:gap-6
               justify-items-center"
  >
    {sortedProducts.map((product) => (
      <ProductCard
        key={product._id}
        product={product}
      />
    ))}
  </div>


  {/* Mobile See All */}
  <div className="flex justify-center mt-8 sm:hidden">
    <button
      onClick={() => navigate("/shop")}
      className="px-6 py-2.5
                 border border-blue-500
                 text-blue-500
                 rounded-xl
                 font-semibold
                 hover:bg-blue-500
                 hover:text-white
                 transition"
    >
      Бүгдийг харах →
    </button>
  </div>

</div>
  )
}

export default TopSeller
