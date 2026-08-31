import React from 'react'
import ProductCart from './ProductCard'
import products from '../data/product'

const Wishlist = () => {
  return (
    <div className="grid gap-4 gap-x-0 grid-cols-4 justify-items-center mt-50">
        {products.filter(product => product.wishlist).map((product) => (<ProductCart key={product.id} product={product} />))}
    </div>
  )
}

export default Wishlist
