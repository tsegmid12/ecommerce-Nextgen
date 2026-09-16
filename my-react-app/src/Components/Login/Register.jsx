import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";

const API_URL = import.meta.env.VITE_API_URL;


const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);  

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${API_URL}/api/register`, {
             email,
            username,
            password,
            role: 'user'
        }).then((response) => {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('username', jwtDecode(response.data.token).username);
            localStorage.setItem('email', jwtDecode(response.data.token).email);
            localStorage.setItem('role', jwtDecode(response.data.token).role);
            navigate('/home');
            window.location.reload();
        }).catch((error) => {
            console.error("Register error:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Бүртгүүлэхэд алдаа гарлаа");
        });
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f7f7] px-4">
  <form
    onSubmit={handleSubmit}
    className="w-full max-w-md bg-white border border-gray-200
               rounded-3xl shadow-xl p-8 sm:p-10
               flex flex-col gap-5"
  >
    {/* Title */}
    <div className="text-center mb-3">
      <h2 className="text-3xl font-bold text-gray-800">
        Бүртгүүлэх
      </h2>

      <p className="text-gray-500 mt-2">
        Шинэ хэрэглэгчийн бүртгэл үүсгэх
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
        required
        className="w-full border border-gray-300 rounded-xl
                   px-4 py-3 outline-none transition
                   focus:border-blue-500
                   focus:ring-2 focus:ring-blue-200"
      />
    </div>

    {/* Username */}
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-700">
        Username
      </label>

      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
        className="w-full border border-gray-300 rounded-xl
                   px-4 py-3 outline-none transition
                   focus:border-blue-500
                   focus:ring-2 focus:ring-blue-200"
      />
    </div>

    {/* Password */}
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Нууц үг"
        className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 outline-none transition
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      />

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
      >
        {showPassword ? "🙈" : "👁️"}
      </button>
    </div>

    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        value={checkPassword}
        onChange={(e) => setCheckPassword(e.target.value)}
        placeholder="Нууц үг"
        className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 outline-none transition
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      />

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
      >
        {showPassword ? "🙈" : "👁️"}
      </button>
    </div>

    {/* Register */}
    <button
      type="submit"
      className="w-full bg-blue-500 hover:bg-blue-600
                 text-white
                  font-semibold py-3 rounded-xl
                 transition duration-200 active:scale-[0.98]
                 shadow-md hover:shadow-lg"
    >
      Бүртгүүлэх
    </button>

    {/* Divider */}
    <div className="flex items-center gap-3 my-1">
      <div className="h-px flex-1 bg-gray-200"></div>

      <span className="text-sm text-gray-400">
        эсвэл
      </span>

      <div className="h-px flex-1 bg-gray-200"></div>
    </div>

    {/* Login */}
    <button
      type="button"
      onClick={() => navigate("/login")}
      className="w-full border-2 border-green-500
                 text-green-600 hover:bg-green-500
                 hover:text-white font-semibold py-3
                 rounded-xl transition duration-200"
    >
      Нэвтрэх
    </button>

    <p className="text-center text-sm text-gray-400 mt-2">
      Бүртгэлтэй бол "Нэвтрэх" товчийг дарна уу.
    </p>
  </form>
</div>
  )
}

export default Register
