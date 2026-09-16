import { useState, useEffect } from 'react'
import axios from 'axios'
import CartCards from './CartCards'
import { useNavigate } from 'react-router-dom'

const CartList = () => {

  const [products, setProducts] = useState([])
  const [userInfo, setUserInfo] = useState(null)
  const navigate = useNavigate()

  const deleteProduct = (productId) => {
    setProducts(prev =>
      prev.filter(item => item.productId._id !== productId)
    )
  }

  const updateProductQuantity = (productId, quantity) => {
    setProducts(prev =>
      prev.map(item =>
        item.productId._id === productId
          ? { ...item, quantity }
          : item
      )
    )
  }

  useEffect(() => {
    axios.get('http://localhost:5000/api/cart', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((response) => {
      setProducts(response.data.products)
      setUserInfo(response.data.user)
    })
    .catch((error) => {
      console.error("Error fetching cart products:", error)
    })
  }, [])

  const totalQuantity = products.reduce(
    (total, item) => total + item.quantity,
    0
  )

  const totalPrice = products.reduce(
    (total, item) => total + item.productId.price * item.quantity,
    0
  )

  const deliveryCost = 0

  return (
    <div className="flex w-full flex-col gap-6 px-3 py-4 sm:px-6 sm:py-6 lg:flex-row lg:items-start lg:gap-8 lg:px-8 lg:py-8">

      {/* ALL CART PRODUCTS */}
      <div className="w-full min-w-0 flex-1 space-y-4">

        {products.length > 0 ? (
          products.map((item) => (
            <CartCards
              key={item.productId._id}
              product={item.productId}
              quantity={item.quantity}
              onDelete={deleteProduct}
              updateQuantity={updateProductQuantity}
            />
          ))
        ) : (
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
            <p className="text-gray-500">
              Таны сагс хоосон байна
            </p>
          </div>
        )}

      </div>

      {/* ORDER SUMMARY */}
      <div className="w-full lg:w-96 lg:shrink-0">

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7 lg:sticky lg:top-5">

          <h2 className="mb-6 text-xl font-bold text-gray-800 sm:text-2xl">
            Захиалгын мэдээлэл
          </h2>

          <div className="space-y-4 sm:space-y-5">

            <div className="flex justify-between gap-4 text-gray-600">
              <span>Тоо ширхэг</span>

              <span className="font-semibold text-gray-800">
                {totalQuantity}
              </span>
            </div>

            <div className="flex justify-between gap-4 text-gray-600">
              <span>Барааны үнэ</span>

              <span className="font-semibold text-gray-800">
                {totalPrice.toLocaleString()}₮
              </span>
            </div>

            <div className="flex justify-between gap-4 border-b pb-5 text-gray-600">
              <span>Хүргэлт</span>

              <span className="font-semibold text-green-600">
                Үнэгүй
              </span>
            </div>

            <div className="flex items-center justify-between gap-4 pt-1">
              <span className="text-lg font-bold text-gray-800 sm:text-xl">
                Нийт үнэ
              </span>

              <span className="text-xl font-bold text-green-600 sm:text-2xl">
                {(totalPrice + deliveryCost).toLocaleString()}₮
              </span>
            </div>

          </div>

          <button
            onClick={() => userInfo?._id && navigate(`/cart/info/${userInfo?._id}`)}
            className="mt-6 h-12 w-full cursor-pointer rounded-full bg-green-600 font-semibold text-white transition hover:bg-green-500 active:scale-[0.98] sm:mt-7"
          >
            Үргэлжлүүлэх →
          </button>

        </div>

      </div>

    </div>
  )
}

export default CartList