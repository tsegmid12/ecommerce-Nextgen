import React from 'react'
import userIcon from '../assets/user.png'
import {useState} from 'react'
import data from '../data/account'
import Acc_comp from './acc_comp.jsx'
import { useNavigate } from 'react-router-dom'

const Account = () => {
  const [active, setActive] = useState(0)
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('phone');
    localStorage.removeItem('address');
    navigate('/home');
  }

  return (
    <div className="flex justify-center min-h-screen bg-[#f7f7f7] pt-40">

    
      <ul className='flex  flex-col border-2 bg-white border-gray-500 h-120 w-100 rounded-3xl mt-30'>
        <ul className='flex  mt-10'>
          <li>
          <img src={userIcon} alt="User" className="h-12 ml-10" />
         </li>
         <li className='text-2xl font-bold mx-10'>  
          Хэрэглэгчийн нэр
          </li>
          </ul>
        <li onClick={() => setActive(0)} className={`text-xl  ml-10 mt-10 cursor-pointer ${active === 0 ? 'font-bold ' : ''}`}>Хувийн мэдэээлэл</li>
        <li onClick={() => setActive(1)} className={`text-xl ml-10 mt-10  cursor-pointer ${active === 1 ? 'font-bold' : ''}`}>Хадгалсан бараа</li>
        <li onClick={() => setActive(2)} className={`text-xl  ml-10 mt-10 cursor-pointer ${active === 2 ? 'font-bold' : ''}`}>Миний захиалга</li>
        <li onClick={() => handleLogout()} className={`text-xl  ml-10 mt-10 cursor-pointer ${active === 3 ? 'font-bold' : ''}`}>Гарах</li>
      </ul>
      <Acc_comp active={active} data={data[0]}/>
    
             

    </div>
  )
}

export default Account
