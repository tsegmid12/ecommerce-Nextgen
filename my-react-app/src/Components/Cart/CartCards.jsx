import trash_can from '../../assets/trash-can.png'
import heart from '../../assets/heart.png'
import heart_full from '../../assets/heart-full.png'
import { useState } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL;


const CartCards = ({ product, quantity, onDelete, updateQuantity }) => {

  const [count, setCount] = useState(quantity || 1)
  const [wishlist, setWishlist] = useState(product.wishlist || false)

  const totalPrice = product.price * count

  const handleDeleteFromCart = async () => {
    try {
      const token = localStorage.getItem("token")

      if (!token) {
        alert("Та эхлээд нэвтэрнэ үү")
        return
      }

      await axios.delete(
        `${API_URL}/api/cart`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            productId: product._id,
          },
        }
      )

      onDelete(product._id)
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Error deleting from cart:", error)
    }
  }

  const handleUpdateCart = async (newQuantity) => {
    try {
      const token = localStorage.getItem("token")

      if (!token) {
        alert("Та эхлээд нэвтэрнэ үү")
        return
      }

      await axios.put(
        `${API_URL}/api/cart`,
        {
          productId: product._id,
          quantity: newQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setCount(newQuantity)
      updateQuantity(product._id, newQuantity)
      window.dispatchEvent(new Event("cartUpdated"));

    } catch (error) {
      console.error("Error updating cart:", error)
    }
  }

  return (
    <div className="flex w-full flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center sm:p-5">

      {/* IMAGE */}
      <div className="flex h-36 w-full shrink-0 items-center justify-center sm:h-32 sm:w-36 hover:cursor-pointer transition-transform"
       onClick={() => window.location.href = `/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="max-h-32 max-w-36 object-contain hover:scale-105"
        />
      </div>

      {/* PRODUCT INFO */}
      <div className="min-w-0 flex-1">

        <h2 className="truncate text-lg font-bold text-gray-800 sm:text-xl">
          {product.name}
        </h2>

        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
          <span className="text-xs text-gray-500">
            {product.status}
          </span>

          <span className="text-xs text-green-600">
            A бүсэд хүргэлт үнэгүй
          </span>
        </div>

        <p className="mt-2 text-xs text-gray-400">
          Үлдэгдэл: {product.count}
        </p>

        {/* QUANTITY */}
        <div className="mt-3 flex h-9 w-32 items-center overflow-hidden rounded-full bg-gray-100">

          <button
            onClick={() => handleUpdateCart(count - 1)}
            disabled={count === 1}
            className="h-full w-10 cursor-pointer text-lg hover:bg-gray-200 disabled:cursor-not-allowed disabled:text-gray-300"
          >
            −
          </button>

          <span className="flex-1 text-center font-semibold">
            {count}
          </span>

          <button
            onClick={() => handleUpdateCart(count + 1)}
            disabled={count >= product.count}
            className="h-full w-10 cursor-pointer text-lg hover:bg-gray-200 disabled:cursor-not-allowed disabled:text-gray-300"
          >
            +
          </button>

        </div>

      </div>

      {/* PRICE + BUTTONS */}
      <div className="flex w-full items-center justify-between sm:w-auto sm:flex-col sm:items-end sm:justify-between sm:self-stretch">

        <p className="text-xl font-bold text-gray-800 sm:text-2xl">
          {totalPrice.toLocaleString()}₮
        </p>

        <div className="flex items-center gap-2 sm:gap-3">

          {/* WISHLIST */}
          <button
            onClick={() => setWishlist(!wishlist)}
            className="cursor-pointer rounded-full p-2 transition hover:bg-gray-100"
          >
            <img
              src={wishlist ? heart_full : heart}
              alt="heart"
              className="h-5 w-5 sm:h-6 sm:w-6"
            />
          </button>

          {/* DELETE */}
          <button
            onClick={handleDeleteFromCart}
            className="cursor-pointer rounded-full p-2 transition hover:bg-red-50"
          >
            <img
              src={trash_can}
              alt="trash"
              className="h-5 w-5 sm:h-6 sm:w-6"
            />
          </button>

        </div>

      </div>

    </div>
  )
}

export default CartCards