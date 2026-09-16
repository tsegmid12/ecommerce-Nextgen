import { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import searchIcon from "../../assets/search.png";
import cartIcon from "../../assets/shopping-cart.png";
import userIcon from "../../assets/user.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Admin from "./AdminNavbar";

const API_URL = import.meta.env.VITE_API_URL;

const Navbar = () => {
  const [products, setProducts] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [active, setActive] = useState(0);

  const navigate = useNavigate();

  const userName = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/products`);

        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error(
          "Products fetch error:",
          error.response?.data || error.message
        );
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  const fetchCartQuantity = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setCartQuantity(0);
        return;
      }

      const response = await axios.get(`${API_URL}/api/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const cartProducts = response.data?.cart?.products || [];

      const quantity = Array.isArray(cartProducts)
        ? cartProducts.reduce(
            (total, item) => total + (Number(item.quantity) || 0),
            0
          )
        : 0;

      setCartQuantity(quantity);
    } catch (error) {
      console.error(
        "Cart fetch error:",
        error.response?.data || error.message
      );
      setCartQuantity(0);
    }
  };

  useEffect(() => {
    fetchCartQuantity();

    const handleCartUpdated = () => {
      fetchCartQuantity();
    };

    window.addEventListener("cartUpdated", handleCartUpdated);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdated);
    };
  }, []);

  const filteredProducts = products.filter((product) => {
    if (!product?.name) return false;

    return product.name
      .toLowerCase()
      .includes(searchItem.toLowerCase());
  });

  if (role === "admin") {
    return <Admin />;
  }

  return (
    <header className="fixed left-2 right-2 top-2 z-50 md:left-4 md:right-4">
      <div className="mx-auto max-w-full rounded-3xl border border-white/60 bg-white/90 px-3 shadow-xl backdrop-blur-xl md:px-6">
        <div className="flex h-20 items-center justify-between gap-3 md:h-24">

          <Link
            to="/home"
            className="shrink-0 transition-transform duration-300 hover:scale-105"
          >
            <img
              src={logo}
              alt="NextGen Store"
              onClick={() => setActive(0)}
              className="h-14 w-auto object-contain md:h-20 lg:h-22"
            />
          </Link>

          <nav className="hidden lg:block">
            <ul className="flex items-center gap-4 text-sm font-semibold text-gray-700 xl:gap-6 xl:text-base">

              <li>
                <Link
                  to="/home"
                  onClick={() => setActive(0)}
                  className={`rounded-xl px-3 py-2 transition-all duration-200 hover:bg-blue-100 hover:text-blue-600 ${
                    active === 0 ? "text-blue-600" : ""
                  }`}
                >
                  Нүүр
                </Link>
              </li>

              <li>
                <Link
                  to="/shop"
                  onClick={() => setActive(1)}
                  className={`rounded-xl px-3 py-2 transition-all duration-200 hover:bg-blue-100 hover:text-blue-600 ${
                    active === 1 ? "text-blue-600" : ""
                  }`}
                >
                  Дэлгүүр
                </Link>
              </li>

              <li>
                <Link
                  to="/wishlist"
                  onClick={() => setActive(2)}
                  className={`rounded-xl px-3 py-2 transition-all duration-200 hover:bg-blue-100 hover:text-blue-600 ${
                    active === 2 ? "text-blue-600" : ""
                  }`}
                >
                  Хүслийн жагсаалт
                </Link>
              </li>

              <li>
                <Link
                  to="/cart"
                  onClick={() => setActive(3)}
                  className={`rounded-xl px-3 py-2 transition-all duration-200 hover:bg-blue-100 hover:text-blue-600 ${
                    active === 3 ? "text-blue-600" : ""
                  }`}
                >
                  Сагс
                </Link>
              </li>

              <li>
                <Link
                  to="/myAccount"
                  onClick={() => setActive(4)}
                  className={`rounded-xl px-3 py-2 transition-all duration-200 hover:bg-blue-100 hover:text-blue-600 ${
                    active === 4 ? "text-blue-600" : ""
                  }`}
                >
                  Миний мэдээлэл
                </Link>
              </li>

            </ul>
          </nav>

          <div className="flex items-center gap-1.5 md:gap-3">

            <div className="relative">
              <div className="flex h-10 w-32 items-center rounded-xl border border-gray-200 bg-gray-50 transition-all duration-300 focus-within:border-blue-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 sm:w-44 md:w-52 lg:w-60">

                <input
                  type="text"
                  placeholder="Бараа хайх..."
                  value={searchItem}
                  onFocus={() => setShowSearch(true)}
                  onChange={(e) => {
                    setSearchItem(e.target.value);
                    setShowSearch(true);
                  }}
                  className="ml-2 min-w-0 flex-1 bg-transparent text-xs text-gray-700 outline-none sm:ml-3 sm:text-sm"
                />

                <img
                  src={searchIcon}
                  alt="Search"
                  className="mr-2 h-4 w-4 shrink-0 opacity-50 sm:mr-3"
                />
              </div>

              {showSearch && searchItem && (
                <div className="absolute left-0 top-12 max-h-80 w-60 overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-2xl">

                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <Link
                        key={product._id}
                        to={`/product/${product._id}`}
                        onClick={() => {
                          setSearchItem("");
                          setShowSearch(false);
                        }}
                        className="flex items-center px-4 py-3 text-sm text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
                      >
                        {product.name}
                      </Link>
                    ))
                  ) : (
                    <p className="px-4 py-4 text-sm text-gray-500">
                      Бараа олдсонгүй
                    </p>
                  )}

                </div>
              )}
            </div>

            <Link
              to="/cart"
              className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-200 hover:bg-blue-50 active:scale-95"
            >
              <img
                src={cartIcon}
                alt="Cart"
                className="h-5 w-5 md:h-6 md:w-6"
              />

              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-500 px-1 text-xs text-white">
                {cartQuantity}
              </span>
            </Link>

            <button
              type="button"
              onClick={() =>
                navigate(userName ? "/myAccount" : "/login")
              }
              className="flex h-10 shrink-0 cursor-pointer items-center gap-2 rounded-xl px-2 transition-all duration-200 hover:bg-blue-50 active:scale-95 md:px-3"
            >
              <img
                src={userIcon}
                alt="User"
                className="h-5 w-5 md:h-6 md:w-6"
              />

              <span className="hidden max-w-28 truncate whitespace-nowrap text-sm font-semibold text-gray-700 md:block">
                {userName || "Нэвтрэх"}
              </span>
            </button>

          </div>
        </div>

        <div className="border-t border-gray-100 pb-3 pt-2 lg:hidden">
          <nav className="overflow-x-auto">
            <ul className="flex min-w-max items-center justify-center gap-2 text-xs font-semibold text-gray-600 sm:gap-4 sm:text-sm">

              <li>
                <Link
                  to="/home"
                  className="block rounded-xl px-3 py-2 transition hover:bg-blue-50 hover:text-blue-600"
                >
                  Нүүр
                </Link>
              </li>

              <li>
                <Link
                  to="/shop"
                  className="block rounded-xl px-3 py-2 transition hover:bg-blue-50 hover:text-blue-600"
                >
                  Дэлгүүр
                </Link>
              </li>

              <li>
                <Link
                  to="/wishlist"
                  className="block rounded-xl px-3 py-2 transition hover:bg-blue-50 hover:text-blue-600"
                >
                  Wishlist
                </Link>
              </li>

              <li>
                <Link
                  to="/cart"
                  className="block rounded-xl px-3 py-2 transition hover:bg-blue-50 hover:text-blue-600"
                >
                  Сагс
                </Link>
              </li>

              <li>
                <Link
                  to="/myAccount"
                  className="block rounded-xl px-3 py-2 transition hover:bg-blue-50 hover:text-blue-600"
                >
                  Миний мэдээлэл
                </Link>
              </li>

            </ul>
          </nav>
        </div>

      </div>
    </header>
  );
};

export default Navbar;