import React from 'react'
import products from '../../data/product'
import CardComponent from './CartCards'

const CartList = () => {
  return (
    <div >
      {products.map((product) => (
        <CardComponent key={product.id} product={product} />
      ))}
    </div>
  )
}

export default CartList
