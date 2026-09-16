import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Navbar from './Components/Navbar/Navbar'
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
import ProductDetail from "./Components/ProductDetail";
import EditProduct from "./Components/admin/EditProduct";
import Order from "./Components/Order";
import AdminProducts from "./Components/admin/AdminProducts";
import AdminOrder from "./Components/admin/Order";
import OrderDetail from "./Components/admin/OrderDetail";
import {useEffect} from "react";
import {jwtDecode} from "jwt-decode";

const App = () => {
  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem("token");
      if(!token) return;

      try{
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; 

        if(decoded.exp < currentTime){
          localStorage.clear();
          window.location.href = "/home";
        }
      }
      catch(error){
        console.error("Token шалгах error:", error);
        localStorage.clear();
      }
    }
    checkTokenExpiration();
    const interval = setInterval(checkTokenExpiration, 60000);
    return () => clearInterval(interval);
  }, [])

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar/>
      
        <Routes >
          
        <Route path="/home" element={<Home />} />

        <Route
          path="/"
          element={<Navigate to="/home" replace />}
        />

        <Route path="/shop" element={<Shop />} />
        <Route path="/myAccount" element={<Account />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart/info/:id" element={<CartInfo />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/admin" element={<AdminRoute><AdminHome/></AdminRoute>} />
        <Route path="/admin/addproduct" element={<AdminRoute><AddProduct/></AdminRoute>} />
        <Route path="/admin/products/edit/:id" element={<AdminRoute><EditProduct/></AdminRoute>} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/order" element={<Order />} />
        <Route path="/admin/products" element={<AdminRoute><AdminProducts/></AdminRoute>} />
        <Route path="/admin/orders" element={<AdminRoute><AdminOrder/></AdminRoute>} />
        <Route path="/admin/orders/:id" element={<AdminRoute><OrderDetail/></AdminRoute>} />

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