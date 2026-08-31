import React from 'react'

const acc_comp = ({active, data}) => {
  return (

    <div className=" border-2 bg-white border-gray-500 h-120 w-220 rounded-3xl mt-30 ml-40 p-10">
        {active === 0 && (
          <>
          <div className="flex justify-between mx-8">
            <h1 className="text-xl ">{data.name}</h1>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-xl">Засах</button>
          </div>

          <h1 className="border border-gray-400 bg-[#f7f7f7] rounded-xl mt-2 p-3">{data.email}</h1>

            <div className="flex justify-between mx-8 mt-10">
              <h1 className="text-xl ">Хаяг</h1>
              <button className="bg-green-500 text-white px-4 py-2 rounded-xl">Нэмэх</button>
            </div>
            <h1 className="border border-gray-400 bg-[#f7f7f7] rounded-xl mt-2 p-3">{data.address || 'Нэмсэн хаяг байхгүй байна'}</h1>

            <div className="flex justify-between mx-8 mt-10">
              <h1 className="text-xl ">Утасны дугаар</h1>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-xl">Нэмэх</button>
            </div>
            <h1 className="border border-gray-400 bg-[#f7f7f7] rounded-xl mt-2 p-3">{data.phone ||  'Нэмсэн дугаар байхгүй байна'}</h1>
          </>
        )}
        
    </div>

  )
}

export default acc_comp
