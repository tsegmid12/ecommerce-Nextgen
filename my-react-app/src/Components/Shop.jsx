import React from 'react'
import Categore from './Categore.jsx'
import Navbar from '../Components/Navbar/Navbar.jsx'
import ProductList from '../Components/ProductList.jsx'
import { Link } from 'react-router-dom'

const Shop = () => {
  return (
    <div className="min-h-screen bg-[#f7f7f7] pt-40">
      <Categore />
      
      <ProductList />
           
    </div>
  )
}

export default Shop