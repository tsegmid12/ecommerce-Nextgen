import {useState, useEffect} from 'react'
import logo from '../../assets/logo.png'
import searchIcon from '../../assets/search.png'
import cartIcon from '../../assets/shopping-cart.png'
import userIcon from '../../assets/user.png'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'


const Navbar = () => {
  const [products, setProducts] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const userName = localStorage.getItem('username');

  const navigate = useNavigate();


  useEffect(() => {
    axios.get('http://localhost:5000/api/products').then((response) => {
      setProducts(response.data);
    });
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchItem.toLowerCase())
  );



  return (
<div className="fixed top-2 left-2 right-2 md:left-4 md:right-4 z-50 bg-white/95 backdrop-blur-md rounded-3xl shadow-lg border border-gray-200 px-3 md:px-6 overflow-x-auto">
  <div className="min-w-max h-20 flex items-center justify-between gap-4 md:gap-8">

    {/* Logo */}
    <Link to="/" className="shrink-0">
      <img src={logo} alt="Logo" className="h-14 md:h-20 lg:h-24 w-auto" />
    </Link>

    {/* Navigation */}
    <nav className="shrink-0">
      <ul className="flex items-center gap-4 md:gap-7 whitespace-nowrap text-sm md:text-base font-semibold text-gray-700">

        <li>
          <Link to="/" className="hover:text-blue-500 transition">
            Нүүр
          </Link>
        </li>

        <li>
          <Link to="/shop" className="hover:text-blue-500 transition">
            Дэлгүүр
          </Link>
        </li>

        <li>
          <Link to="/wishlist" className="hover:text-blue-500 transition">
            Хүслийн жагсаалт
          </Link>
        </li>

        <li>
          <Link to="/cart" className="hover:text-blue-500 transition">
            Сагс
          </Link>
        </li>

        <li>
          <Link to="/myAccount" className="hover:text-blue-500 transition">
            Миний мэдээлэл
          </Link>
        </li>

      </ul>
    </nav>

    {/* Right section */}
    <div className="flex items-center gap-3 md:gap-5 shrink-0">

      {/* Search */}
      <div className="relative shrink-0">

        <div className="flex items-center border border-gray-300 rounded-xl h-10 w-44 md:w-60 bg-gray-50 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition">

          <input
            type="text"
            placeholder="Бараа хайх..."
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
            className="ml-3 outline-none bg-transparent w-full text-sm"
          />

          <img src={searchIcon} alt="Search" className="h-4 mr-3 opacity-60" />

        </div>

        {/* Search result */}
        {searchItem && (
          <div className="absolute top-12 left-0 w-44 md:w-60 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-60">

            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Link
                  key={product._id}
                  to={`/product/${product._id}`}
                  onClick={() => setSearchItem("")}
                  className="block px-4 py-3 text-sm hover:bg-gray-100 transition"
                >
                  {product.name}
                </Link>
              ))
            ) : (
              <p className="px-4 py-3 text-sm text-gray-500">
                Бараа олдсонгүй
              </p>
            )}

          </div>
        )}

      </div>

      {/* Cart */}
      <Link to="/cart" className="relative shrink-0 p-2 rounded-xl hover:bg-gray-100 transition">
        <img src={cartIcon} alt="Cart" className="h-5 md:h-6" />
      </Link>

      {/* User */}
      <button
        onClick={() => navigate(userName === null ? "/login" : "/myAccount")}
        className="flex items-center gap-2 shrink-0 px-2 py-2 rounded-xl hover:bg-gray-100 transition"
      >
        <img src={userIcon} alt="User" className="h-5 w-5" />

        <span className="text-sm md:text-base font-semibold text-gray-700 max-w-28 truncate whitespace-nowrap">
          {userName === null ? "Нэвтрэх" : userName}
        </span>
      </button>

    </div>
  </div>
</div>
  )
}

export default Navbar