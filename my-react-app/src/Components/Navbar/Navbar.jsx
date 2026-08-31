import {useState} from 'react'
import logo from '../../assets/logo.png'
import searchIcon from '../../assets/search.png'
import cartIcon from '../../assets/shopping-cart.png'
import userIcon from '../../assets/user.png'
import {Link} from 'react-router-dom'


const Navbar = ({data, products}) => {
  const [searchItem, setSearchItem] = useState('');

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchItem.toLowerCase())
  );

  return (
<div className="fixed top-0 left-0 right-0 flex flex-col md:flex-row bg-white rounded-4xl shadow-xl border-black m-4 px-4 justify-between items-center gap-3">
        {/* Logo */}
        <Link to="/">
        <img 
          src={logo}
          alt="Logo"
          className="h-20 md:h-28 lg:h-34 mx-2 -my-6 mb" 
        /></Link>

        <ul className="flex gap-8 md:gap-10 text-base md:text-md font-semibold">
          <li className="cursor-pointer">
            <Link to="/">Нүүр</Link>
          </li>
          <li className="cursor-pointer">
            <Link to="/shop">Дэлгүүр</Link>
          </li>
          <li className="cursor-pointer">
            <Link to="/wishlist">Хүслийн жагсаалт</Link>
          </li>
          <li className="cursor-pointer">
            <Link to="/cart">Сагс</Link>
          </li>
          <li className="cursor-pointer">
            <Link to="/myAccount">Миний мэдээлэл</Link>   
          </li>
        </ul>

        <div className="flex items-center gap-3 md:gap-6">
          
        <div className="relative">
          {/* Search */}
          <div className="flex items-center border rounded-xl h-9 w-60">
            <input
              type="text"
              placeholder="Search"
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
              className="ml-3 outline-none w-full"
            />

            <img
              src={searchIcon}
              alt="Search"
              className="h-4 mr-3"
            />
          </div>

          {/* Search result */}
          {searchItem && (
            <div className="absolute top-11 left-0 w-60 bg-white border rounded-xl shadow-lg z-50">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="block p-3 hover:bg-gray-100"
                  >
                    {product.name}
                  </Link>
                ))
              ) : (
                <p className="p-3 text-gray-500">
                  Бараа олдсонгүй
                </p>
              )}
            </div>
          )}
        </div>


          {/* Cart */}
          <Link to='/cart'>
          <img
            src={cartIcon}
            alt="Cart"
            className="h-5 md:h-6 cursor-pointer"
          />
          </Link>


          {/* User */}
          <Link to="/myAccount" className="flex items-center gap-2">
          <img
            src={userIcon}
            alt="User"
            className="h-4 md:h-5 cursor-pointer "
          />
          <h1>{data.name}</h1>
          </Link>
          
        </div>
      </div>
  )
}

export default Navbar