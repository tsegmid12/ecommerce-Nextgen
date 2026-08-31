import React from 'react'
import products from '../data/product'
import ProductCard from './ProductCard'
import { useState } from "react";

const TopSeller = () => {
    const sortedProducts = [...products].sort((a, b) => b.sold - a.sold).slice(0, 4);
    
  return (
    <div>
        <h1 className='text-3xl font-bold mt-10 ml-30'>Онцох бүтээгдэхүүн</h1>
        <div className="grid gap-4 gap-x-0 grid-cols-4 justify-items-center mt-10">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  )
}

export default TopSeller
