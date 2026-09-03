import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import UserNavbar from './Components/Navbar/Navbar'
import Home from './Components/Home'
import Shop from './Components/Shop'
import Account from './Components/Account'
import Mouse from './Components/Mouse'
import Keyboard from './Components/Keyboard'
import Accessories from './Components/Accessories'
import Headset from './Components/Headset'
import Mousepad from './Components/Mousepad'
import Footer from './Components/Footer'
import Cart from './Components/Cart/Cart'
import Wishlist from './Components/Wishlist'
import CartInfo from './Components/Cart/CartInfo'
import ScrollToTop from './Components/ScrollToTop'
import Login from './Components/Login/Login'
import Register from './Components/Login/Register'
import AdminHome from './Components/admin/Admin'
import AddProduct from './Components/admin/AddProduct'
import AdminRoute from "./Components/admin/AdminRoute";
import AdminNavbar from "./Components/Navbar/AdminNavbar";


const App = () => {
const user = JSON.parse(localStorage.getItem("user"));

  return (
    <BrowserRouter>
      <ScrollToTop />
      {user.role !== "admin" || "" ? <UserNavbar /> : <AdminNavbar />}
      
        <Routes >
        
        <Route path="/home" element={<Home />} />

        <Route
          path="/"
          element={<Navigate to="/home" replace />}
        />

        <Route path="/shop" element={<Shop />} />
        <Route path="/myAccount" element={<Account />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart/info" element={<CartInfo />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/admin" element={<AdminRoute><AdminHome/></AdminRoute>} />
        <Route path="/admin/addproduct" element={<AdminRoute><AddProduct/></AdminRoute>} />



        <Route path="/shop/mouse" element={<Mouse />} />
        <Route path="/shop/keyboard" element={<Keyboard />} />
        <Route path="/shop/accessories" element={<Accessories />} />
        <Route path="/shop/headset" element={<Headset />} />
        <Route path="/shop/mousepad" element={<Mousepad />} />
      </Routes>
      <Footer />
      
      
    </BrowserRouter>
  )
}

export default App