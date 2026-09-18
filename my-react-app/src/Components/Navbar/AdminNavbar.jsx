import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("phone");
    localStorage.removeItem("address");
    localStorage.removeItem("role");

    navigate("/login");
    window.location.reload();
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-gray-900 text-white shadow-lg z-50">
      <div className="h-full flex items-center justify-between px-4 sm:px-6">

        {/* Logo */}
        <Link
          to="/admin"
          onClick={closeMenu}
          className="text-lg sm:text-xl font-bold text-white whitespace-nowrap"
        >
          ADMIN PANEL
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-5 lg:gap-6">

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

          {/* Desktop User */}
          <div className="flex items-center gap-3 border-l border-gray-600 pl-5">
            <div className="text-sm">
              <p className="font-semibold">{username}</p>
              <p className="text-xs text-gray-400">
                Administrator
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 focus:outline-none"
          aria-label="Toggle menu"
        >
          <div className="w-6 space-y-1.5">
            <span
              className={`block h-0.5 bg-white transition-all duration-300 ${
                menuOpen
                  ? "rotate-45 translate-y-2"
                  : ""
              }`}
            />

            <span
              className={`block h-0.5 bg-white transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />

            <span
              className={`block h-0.5 bg-white transition-all duration-300 ${
                menuOpen
                  ? "-rotate-45 -translate-y-2"
                  : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-700 shadow-lg">
          <div className="px-4 py-4 space-y-1">

            <Link
              to="/admin"
              onClick={closeMenu}
              className="block px-4 py-3 rounded-lg hover:bg-gray-800 hover:text-blue-400 transition"
            >
              Dashboard
            </Link>

            <Link
              to="/admin/products"
              onClick={closeMenu}
              className="block px-4 py-3 rounded-lg hover:bg-gray-800 hover:text-blue-400 transition"
            >
              Products
            </Link>

            <Link
              to="/admin/users"
              onClick={closeMenu}
              className="block px-4 py-3 rounded-lg hover:bg-gray-800 hover:text-blue-400 transition"
            >
              Users
            </Link>

            <Link
              to="/admin/addproduct"
              onClick={closeMenu}
              className="block px-4 py-3 rounded-lg hover:bg-gray-800 hover:text-blue-400 transition"
            >
              + Add Product
            </Link>

            {/* Mobile User */}
            <div className="border-t border-gray-700 mt-3 pt-4">

              <div className="px-4 mb-3">
                <p className="font-semibold text-sm">
                  {username}
                </p>

                <p className="text-xs text-gray-400">
                  Administrator
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="w-full bg-red-600 hover:bg-red-700 px-4 py-3 rounded-lg transition"
              >
                Logout
              </button>

            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;