import React from 'react'
import ProductCart from './ProductCard'
import products from '../data/product'

const Wishlist = () => {
  return (
    <div className="  grid
  grid-cols-1
  sm:grid-cols-2
  lg:grid-cols-3
  xl:grid-cols-4
  gap-6
  px-4 sm:px-6 lg:px-10
  mt-8
  justify-items-center">
        {products.filter(product => product.wishlist).map((product) => (<ProductCart key={product.id} product={product} />))}
    </div>
  )
}

export default Wishlist
