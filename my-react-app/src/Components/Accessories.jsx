import React from 'react'
import ProductList from './ProductList.jsx'
import Categore from './Categore.jsx'

const Accessories = () => {
  return (
    <div className="min-h-screen bg-[#f7f7f7] pt-40">
      <Categore />
      <h1 className="text-3xl font-bold mt-10 ml-30">Accessories</h1>
      <ProductList defaultCategory="accessories" showFilter={false} />
    </div>
  )
}

export default Accessories
