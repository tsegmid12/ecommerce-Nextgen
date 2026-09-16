import { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import searchIcon from "../../assets/search.png";
import cartIcon from "../../assets/shopping-cart.png";
import userIcon from "../../assets/user.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Admin from "./AdminNavbar";

const Navbar = () => {
  const [products, setProducts] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);

  const userName = localStorage.getItem("username");
  const [role, setRole] = useState(localStorage.getItem("role"));
  const navigate = useNavigate();
  const [active, setActive] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Products fetch error:", error);
      });

  }, []);

const fetchCartQuantity = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      setCartQuantity(0);
      return;
    }

    const response = await axios.get(
      "http://localhost:5000/api/cart",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const quantity = response.data.products.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setCartQuantity(quantity);
  } catch (error) {
    console.error("Cart fetch error:", error);
  }
};

useEffect(() => {
  fetchCartQuantity();

  const handleCartUpdated = () => {
    fetchCartQuantity();
  }
  window.addEventListener("cartUpdated", handleCartUpdated);

  return () => {
    window.removeEventListener("cartUpdated", handleCartUpdated);
  };
}, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchItem.toLowerCase())
  );

  return (
    <>
    {
      role != "admin" ? (
        <header className="fixed left-2 right-2 top-2 z-50 md:left-4 md:right-4">
      <div className="mx-auto max-w-full rounded-3xl border border-white/60 bg-white/90 px-3 shadow-xl backdrop-blur-xl md:px-6">

        <div className="flex h-20  items-center justify-between gap-3 md:h-24">

          {/* Logo */}
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

          {/* Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-4 text-sm font-semibold text-gray-700 xl:gap-6 xl:text-base">
              <li className="active:scale-95">
                <Link
                  to="/home"
                  onClick={() => setActive(0)}
                  className={`rounded-xl px-3 py-2 transition-all duration-200 hover:bg-blue-100 hover:text-blue-600 ${
                  active === 0 ? 'text-blue-600' : ''}`}
                >
                  Нүүр
                </Link>
              </li>

              <li className="active:scale-95">
                <Link
                  to="/shop"
                  onClick={() => setActive(1)}
                  className={`rounded-xl px-3 py-2 transition-all duration-200 hover:bg-blue-100 hover:text-blue-600 ${active === 1 ? 'text-blue-600' : ''}`}
                >
                  Дэлгүүр
                </Link>
              </li>

              <li className="active:scale-95">
                <Link
                  to="/wishlist"
                  onClick={() => setActive(2)}
                  className={`rounded-xl px-3 py-2 transition-all duration-200 hover:bg-blue-100 hover:text-blue-600 ${active === 2 ? ' text-blue-600' : ''}`}
                >
                  Хүслийн жагсаалт
                </Link>
              </li>

              <li className="active:scale-95">
                <Link
                  to="/cart"
                  onClick={() => setActive(3)}
                  className={`rounded-xl px-3 py-2 transition-all duration-200 hover:bg-blue-100 hover:text-blue-600 ${active === 3 ? 'text-blue-600' : ''}`}
                >
                  Сагс
                </Link>
              </li>

              <li className="active:scale-95">
                <Link
                  to="/myAccount"
                  onClick={() => setActive(4)}
                  className={`rounded-xl px-3 py-2 transition-all duration-200 hover:bg-blue-100 hover:text-blue-600 ${active === 4 ? 'text-blue-600' : ''}`}
                >
                  Миний мэдээлэл
                </Link>
              </li>

            </ul>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-1.5 md:gap-3">

            {/* Search */}
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

              {/* Search Results */}
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

            {/* Cart */}
            <Link
              to="/cart"
              className="flex  h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-200 hover:bg-blue-50 active:scale-95"
            >
              <img
                src={cartIcon}
                alt="Cart"
                className="h-5 w-5 md:h-6 md:w-6"
              />
              <span className="mb-6 -ml-1  flex h-5 w-5 p-2 items-center justify-center rounded-full bg-blue-500  text-xs text-white">                
                {cartQuantity}
              </span>
            </Link>

            {/* User */}
            <button
              type="button"
              onClick={() =>
                navigate(
                  userName === null ? "/login" : "/myAccount"
                )
              }
              className="flex h-10 shrink-0 cursor-pointer items-center gap-2 rounded-xl px-2 transition-all duration-200 hover:bg-blue-50 md:px-3 active:scale-95"
            >
              <img
                src={userIcon}
                alt="User"
                className="h-5 w-5 md:h-6 md:w-6"
              />

              <span className="hidden max-w-28 truncate whitespace-nowrap text-sm font-semibold text-gray-700 md:block ">
                {userName === null ? "Нэвтрэх" : userName}
              </span>
            </button>

          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="border-t border-gray-100 pb-3 pt-2 lg:hidden">
          <nav className="overflow-x-auto">
            <ul className="flex min-w-max items-center justify-center gap-2 text-xs font-semibold text-gray-600 sm:gap-4 sm:text-sm">

              <li>
                <Link
                  to="/"
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
      )  :(
        <Admin />
      )
    }
    </>
    
  );
};

export default Navbar;