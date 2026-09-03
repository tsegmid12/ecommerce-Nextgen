import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("phone");
    localStorage.removeItem("address");
    localStorage.removeItem("role");

    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-gray-900 text-white shadow-lg z-50">
      <div className="h-full flex items-center justify-between px-6">

        {/* Logo */}
        <Link
          to="/admin"
          className="text-xl font-bold text-white"
        >
          ADMIN PANEL
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-6">

          <Link
            to="/admin"
            className="hover:text-blue-400 transition"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/products"
            className="hover:text-blue-400 transition"
          >
            Products
          </Link>

          <Link
            to="/admin/users"
            className="hover:text-blue-400 transition"
          >
            Users
          </Link>

          <Link
            to="/admin/addproduct"
            className="hover:text-blue-400 transition"
          >
            + Add Product
          </Link>

          {/* User */}
          <div className="flex items-center gap-3 border-l border-gray-600 pl-5">
            <div className="text-sm">
              <p className="font-semibold">{username}</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
            >
              Logout
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;