import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { jwtDecode } from "jwt-decode";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post('http://localhost:5000/api/login', {
          email: email,
          password: password
      }).then((response) => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(jwtDecode(response.data.token)));
        localStorage.setItem('username', jwtDecode(response.data.token).username);
        localStorage.setItem('email', jwtDecode(response.data.token).email);
        localStorage.setItem('phone', jwtDecode(response.data.token).phone || '');
        localStorage.setItem('address', jwtDecode(response.data.token).address || '');
        if (jwtDecode(response.data.token).role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/home');
        }
      }).catch((error) => {
        console.error(error)
      })
    };
  return (
   <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-blue-100 px-4">
  <form
    onSubmit={handleSubmit}
    className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10 flex flex-col gap-5"
  >
    {/* Title */}
    <div className="text-center mb-3">
      <h2 className="text-3xl font-bold text-gray-800">
        Нэвтрэх
      </h2>

      <p className="text-gray-500 mt-2">
        Бүртгэлээрээ нэвтэрнэ үү
      </p>
    </div>

    {/* Email */}
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-700">
        Email
      </label>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="example@gmail.com"
        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none transition
                   focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      />
    </div>

    {/* Password */}
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-700">
        Password
      </label>

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Нууц үг"
        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none transition
                   focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      />
    </div>

    {/* Login */}
    <button
      type="submit"
      className="w-full bg-blue-500 hover:bg-blue-600 active:scale-[0.98]
                 text-white font-semibold py-3 rounded-xl transition duration-200
                 shadow-md hover:shadow-lg"
    >
      Нэвтрэх
    </button>

    {/* Divider */}
    <div className="flex items-center gap-3 my-1">
      <div className="h-px flex-1 bg-gray-200"></div>
      <span className="text-sm text-gray-400">эсвэл</span>
      <div className="h-px flex-1 bg-gray-200"></div>
    </div>

    {/* Register */}
    <button
      type="button"
      onClick={() => navigate("/register")}
      className="w-full border-2 border-green-500 text-green-600
                 hover:bg-green-500 hover:text-white
                 font-semibold py-3 rounded-xl transition duration-200"
    >
      Бүртгүүлэх
    </button>

    {/* Footer */}
    <p className="text-center text-sm text-gray-400 mt-2">
      Бүртгэлгүй бол дээрх "Бүртгүүлэх" товчийг дарна уу.
    </p>
  </form>
</div>
  )
}

export default Login
