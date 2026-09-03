import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const acc_comp = ({active, data}) => {

  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('username');
  const userEmail = localStorage.getItem('email');
  const [newaddress, setAddress] = useState(data.address || '');
  const [newphone, setPhone] = useState(data.phone || '');
  const [newEmail, setEmail] = useState(userEmail || '');
  const address = (localStorage.getItem('address') || '');
  const phoneNum = (localStorage.getItem('phone') || '');
  const [showModalPhone, setShowModalPhone] = useState(false);
  const [showModalAddress, setShowModalAddress] = useState(false);
  const [showModal, setShowModal] = useState(false);



  return (

    <div className=" border-2 bg-white border-gray-500 h-120 w-220 rounded-3xl mt-30 ml-40 p-10">
        {active === 0 && (
          userName === null ? (
            <div className="flex justify-center items-center h-full">
              <h1 className="text-2xl font-bold">Нэвтрээгүй байна</h1>
            </div>
          ) : ( 
          <>
          <div className="flex justify-between mx-8">
            <h1 className="text-xl ">{userName}</h1>
            <button onClick={() => setShowModal(true)} className="bg-blue-500 text-white px-4 py-2 rounded-xl">{userEmail ? 'Засах' : 'Нэмэх'}</button>
           
          </div>

          <h1 className="border border-gray-400 bg-[#f7f7f7] rounded-xl mt-2 p-3">{userEmail}</h1>

            <div className="flex justify-between mx-8 mt-10">
              <h1 className="text-xl ">Хаяг</h1>
              <button onClick={() => setShowModalAddress(true)} className="bg-green-500 text-white px-4 py-2 rounded-xl">{address ? 'Засах' : 'Нэмэх'}</button>
              
            </div>
            <h1 className="border border-gray-400 bg-[#f7f7f7] rounded-xl mt-2 p-3">{address || 'Нэмсэн хаяг байхгүй байна'}</h1>

            <div className="flex justify-between mx-8 mt-10">
              <h1 className="text-xl ">Утасны дугаар</h1>
              <button onClick={() => setShowModalPhone(true)} className="bg-blue-500 text-white px-4 py-2 rounded-xl">{phoneNum ? 'Засах' : 'Нэмэх'}</button>
            </div>
            <h1 className="border border-gray-400 bg-[#f7f7f7] rounded-xl mt-2 p-3">{phoneNum ||  'Нэмсэн дугаар байхгүй байна'}</h1>
          </>
          )
        )}
        
    </div>

  )
}

export default acc_comp
