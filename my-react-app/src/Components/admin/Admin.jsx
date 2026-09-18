import React from 'react'
import Edit from './AddProduct'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL;


const Admin = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get(`${API_URL}/api/admin`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) =>{
      setProducts(response.data.products);
      setUsers(response.data.users);
      setOrders(response.data.orders);
    })
  }, [])
  
  return (
    <div className="min-h-screen bg-[#f7f7f7] px-4 py-20">
  <div className="max-w-6xl mx-auto">

    {/* Header */}
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Admin Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Бүтээгдэхүүн болон хэрэглэгчийн мэдээллийг удирдах
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/addproduct")}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-md transition duration-200 active:scale-[0.98]"
        >
          Бүтээгдэхүүн нэмэх
        </button>

      </div>
    </div>

    {/* Dashboard cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">

      <div onClick={() => navigate("/admin/products")} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <p className="text-sm text-gray-500">
          Products
        </p>

        <h2 className="text-3xl font-bold text-gray-800 mt-2">
          {products.length}
        </h2>
      </div>

      <div onClick={() => navigate("/admin/orders")} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <p className="text-sm text-gray-500">
          Orders
        </p>

        <h2 className="text-3xl font-bold text-gray-800 mt-2">
          {orders.length}
        </h2>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <p className="text-sm text-gray-500">
          Users
        </p>

        <h2 className="text-3xl font-bold text-gray-800 mt-2">
          {users.length}
        </h2>
      </div>

    </div>

  </div>
</div>
  )
}

export default Admin
