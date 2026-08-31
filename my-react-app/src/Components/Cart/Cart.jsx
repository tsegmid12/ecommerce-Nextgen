import React from 'react'
import CartList from './CartList'
import {useNavigate} from 'react-router-dom'
import products from '../../data/product'
import CartCards from './CartCards'


const Cart = () => {
  const navigate = useNavigate();

  const totalPrice = products.reduce((total, product) => {
    if (product.cart) {
      return total + product.price * product.count;
    }
    return total;
  }, 0);
  const totalCount = products.reduce((total, product) => total + (product.cart ? product.count : 0), 0);
  const deliveryCost = 0;
  return (
    <div className=" flex pt-40 bg-[#f7f7f7]">
      <CartList />
      <div className='flex flex-col gap-4 bg-white mt-10 ml-50 h-100 w-100 border rounded-xl'>
        <div className='flex justify-between mx-10 mt-14'>
          <p className='font-semibold text-xl'>Тоо ширхэг:</p>
          <span className='font-bold text-xl'>{totalCount}</span>
        </div>

        <div className='flex justify-between mx-10'>
          <p className='font-semibold text-xl'>Үнэ:</p>
          <span className='font-bold text-xl'>{totalPrice}₮</span>
        </div>

        <div className='flex justify-between border-b pb-10 mx-10'>
          <p className='font-semibold text-xl'>Хүргэлт:</p>
          <span className='font-bold text-xl'>{deliveryCost}₮</span>
        </div>
        <div className='flex justify-between mx-10'>
          <p className='font-bold text-2xl'>Нийт үнэ:</p>
          <span className='font-bold text-2xl'>{totalPrice + deliveryCost}₮</span>
        </div>
        <button onClick={() => navigate('/cart/info')} className='self-center bg-green-600 text-white text-lg font-semibold h-10 w-80 rounded-3xl mt-6 cursor-pointer hover:bg-green-400'>Үргэлжлүүлэх</button>
      </div>
    </div>
  )
}

export default Cart
