import React from 'react'
import Categore from './Categore.jsx'
import ProductList from '../Components/ProductList.jsx'

const Headset = () => {
  return (
    <div className="min-h-screen bg-[#f7f7f7] pt-40">
      <Categore />
      <h1 className="text-3xl font-bold mt-10 ml-30">Headset</h1>
      <ProductList defaultCategory="headset" showFilter={false} />
    </div>
  )
}

export default Headset
