import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Cart = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [userInfo, setUserInfo] = useState(null)
  const [userName, setUserName] = useState(null)
  const [userEmail, setUserEmail] = useState(null)
  const [userPhone, setUserPhone] = useState(null)
  const [userAddress, setUserAddress] = useState(null)
  const [description, setDescription] = useState("");

  const { id } = useParams();

useEffect(() => {
  const fetchCartProducts = async () => {
    try{
        const response = await axios.get('http://localhost:5000/api/cart', {
        headers:{
          "Authorization" : `Bearer ${localStorage.getItem('token')}`
        }
      })
      setProducts(response.data.products)
      console.log("Cart products:", response.data.products)
      setUserInfo(response.data.user)
    }
    catch(error){
      console.log("Error fetching cart products:", error.message)
    }
  }
  fetchCartProducts()
}, [])

useEffect(() => {
  if(userInfo){
    setUserName(userInfo.username)
    setUserEmail(userInfo.email)
    setUserAddress(userInfo.address)
    setUserPhone(userInfo.phone)
  }
}, [userInfo])

const handleUpdate = (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  if(!token){
    console.error("Token not found in localStorage");
    return;
  }
  if(!userName || !userEmail || !userAddress || !userPhone){
    alert("Хэрэглэгчийн мэдээллийг бөглөнө үү");
    return;
  }
  axios.put(`http://localhost:5000/api/user/update/${id}`, {
    username: userName,
    email: userEmail,
    address: userAddress,
    phone: userPhone,
  },
  {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  },
  navigate("/order", {
            state:{
              userId: id,
              products: products,
              totalAmount: totalPrice,
              description: description
              
            }
          })
  ).catch((error) => {
    console.error(error);
  })
}

  
  const totalPrice = products.reduce((total, item) => total + item.productId.price * item.quantity, 0);
  const totalCount = products.reduce((total, item) => total + item.quantity, 0);
  const deliveryCost = 0;
  const grandTotal = totalPrice + deliveryCost;

  return (
    <div className="min-h-screen bg-[#f7f7f7] px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <form onSubmit={handleUpdate}>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
            Захиалга
          </h1>
          <div className="mt-2 h-1 w-14 rounded-full bg-blue-500"></div>
          <p className="mt-3 text-sm text-gray-500">
            Захиалгын мэдээллээ бөглөж, төлбөрөө төлнө үү.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* Customer Information */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7 lg:col-span-2">

            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Хэрэглэгчийн мэдээлэл
              </h2>
              <p className="mt-1 text-sm text-gray-400">
                Холбоо барих мэдээллээ оруулна уу.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Овог нэр
                </label>
                <input
                  type="text"
                  value={userName || ""}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder={userInfo?.username || "Овог нэр"}
                  className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  И-мэйл
                </label>
                <input
                  type="email"
                  value={userEmail || ""}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="И-мэйл"
                  className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Утасны дугаар
                </label>
                <input
                  type="tel"
                  value={userPhone || ""}
                  onChange={(e) => setUserPhone(e.target.value)}
                  placeholder="Утасны дугаар"
                  className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white"
                />
              </div>
            </div>

            {/* Description */}
            <div className="mt-7">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Нэмэлт тайлбар
              </label>

              <textarea
                placeholder="Захиалгын талаар нэмэлт мэдээлэл байвал бичнэ үү..."
                className="min-h-32 w-full resize-none rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Address */}
            <div className="mt-7">
              <div className="mb-3">
                <h2 className="text-lg font-bold text-gray-800">
                  Хүргэлтийн хаяг
                </h2>
                <p className="mt-1 text-sm text-gray-400">
                  Бараа хүргүүлэх хаягаа оруулна уу.
                </p>
              </div>
                 <input 
                  type="text"
                  value={userAddress || ""}
                  onChange={(e) => setUserAddress(e.target.value)}
                  placeholder="Хаяг"
                  className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white" 
                  ></input>
         
             
            </div>
          </div>

          {/* Order Summary */}
          <div className="h-fit rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">

            <div className="mb-7">
              <h2 className="text-xl font-bold text-gray-800">
                Захиалгын мэдээлэл
              </h2>
            </div>

            <div className="space-y-5">

              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">
                  Тоо ширхэг
                </p>
                <span className="font-bold text-gray-800">
                  {totalCount}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">
                  Барааны үнэ
                </p>
                <span className="font-bold text-gray-800">
                  {totalPrice.toLocaleString()}₮
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-gray-100 pb-5">
                <p className="text-sm font-medium text-gray-500">
                  Хүргэлт
                </p>
                <span className="font-bold text-gray-800">
                  {deliveryCost.toLocaleString()}₮
                </span>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-gray-800">
                  Нийт үнэ
                </p>
                <span className="text-2xl font-bold text-green-600">
                  {grandTotal.toLocaleString()}₮
                </span>
              </div>

            </div>

            <button
              type="button"
              onClick={(e) => handleUpdate(e)}
              className="mt-8 h-12 w-full cursor-pointer rounded-xl bg-green-600 text-base font-semibold text-white transition hover:bg-green-500"
            >
              Төлбөр төлөх
            </button>

            <p className="mt-4 text-center text-xs text-gray-400">
              Төлбөрийн хуудас руу шилжихээс өмнө мэдээллээ шалгана уу.
            </p>
          </div>
        </div>
        </form>
      
      </div>
    </div>
  );
};

export default Cart;