import React from 'react'
import {useNavigate} from 'react-router-dom'


const Cart = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = React.useState(false);

  const totalPrice = 0; 
  const totalCount = 0; 
  const deliveryCost = 0;
  return (
    <div className=" flex pt-40 bg-[#f7f7f7]">
        <div className='flex flex-col bg-white mt-10 ml-40 h-100 w-240 border rounded-xl'>
            <div className='flex  justify-between mx-5 mt-8 mb-2'>
                <input type="text" placeholder='Овог нэр' className='border rounded-xl h-8 w-60 mt-2 p-2'/>
                <input type="email" placeholder='И-мэйл' className='border rounded-xl h-8 w-60 mt-2  p-2'/>
                <input type='tel' placeholder='Утасны дугаар' className='border rounded-xl h-8 w-60 mt-2 p-2'/>
            </div>
            <div className='flex flex-col mx-4 gap-2 mt-4'>
                <p>Нэмэлт тайлбар</p>
                <input type="text"  className='border rounded-2xl h-30 w-230 mt-2 p-2'/>
            </div>
            <div className='flex flex-col mx-4 gap-2 mt-4'>
                <p className=''>Хүргэлтийн хаяг</p>
                <button onClick={() => setShowModal(true)} className='text-lg font-semibold h-20 w-230 border rounded-2xl hover:bg-[#f7f7f7] cursor-pointer'>+ Хаяг нэмэх</button>
                {
                    showModal && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center ">

                        {/* Modal */}
                        <div className="bg-white w-100 p-6 rounded-2xl shadow-xl">
                            <h2 className="text-2xl font-bold">
                            Хаяг нэмэх
                            </h2>

                            <input
                            type="text"
                            placeholder="Аймаг/Хот"
                            className="border rounded-xl p-2 w-full mt-5"
                            />

                            <input
                            type="text"
                            placeholder="Сум/Дүүрэг"
                            className="border rounded-xl p-2 w-full mt-3"
                            />

                            <input
                            type="text"
                            placeholder="Баг/Хороо"
                            className="border rounded-xl p-2 w-full mt-3"
                            />

                            <input
                            type="text"
                            placeholder="Гудамж/Байр"
                            className="border rounded-xl p-2 w-full mt-3"
                            />

                            <input
                            type="text"
                            placeholder="Хаягийн тоот"
                            className="border rounded-xl p-2 w-full mt-3"
                            />

                            <input
                            type="text"
                            placeholder="Дэлгэрэнгүй хаяг"
                            className="border rounded-xl p-2 w-full mt-3"
                            />

                            <div className="flex justify-end gap-3 mt-5">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-300 px-5 py-2 rounded-xl hover:bg-gray-400"
                            >
                                Буцах
                            </button>

                            <button onClick={() => setShowModal(false)}
                                className="bg-green-600 text-white px-5 py-2 rounded-xl hover:bg-green-400"
                            >
                                Баталгаажуулах
                            </button>
                            </div>
                        </div>

                    </div>
                    ) 
                }
            </div>
        </div>
      <div className='flex flex-col gap-4 bg-white mt-10 ml-50 h-100 w-100 border rounded-xl'>
        <div className='flex justify-between mx-10 mt-14'>
          <p className='font-semibold text-xl'>Тоо ширхэг:</p>
          <span className='font-bold text-xl'>{totalCount}</span>
        </div>

        <div className='flex justify-between mx-10'>
          <p className='font-semibold text-xl'>Үнэ:</p>
          <span className='font-bold text-xl'>{totalPrice}₮</span>
        </div>

        <div className='flex justify-between border-b pb-10 mx-10'>
          <p className='font-semibold text-xl'>Хүргэлт:</p>
          <span className='font-bold text-xl'>{deliveryCost}₮</span>
        </div>
        <div className='flex justify-between mx-10'>
          <p className='font-bold text-2xl'>Нийт үнэ:</p>
          <span className='font-bold text-2xl'>{totalPrice + deliveryCost}₮</span>
        </div>
        <button onClick={() => navigate('/cart/payment')} className='self-center bg-green-600 text-white text-lg font-semibold h-10 w-80 rounded-3xl mt-6 cursor-pointer hover:bg-green-400'>Төлбөр төлөх</button>
      </div>
    </div>
  )
}

export default Cart
