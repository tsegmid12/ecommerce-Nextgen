import React from 'react'
import keyboard from '../assets/keyboard.png'
import mouse from '../assets/mouse.png'
import headset from '../assets/headset.png'
import mousepad from '../assets/mousepad.png'
import accessiors from '../assets/accesiors.webp'
import { Link } from 'react-router-dom'

const Categore = () => {
  return (
   <div className="w-full px-4 mt-20">
  <ul className="flex justify-center items-center gap-4 md:gap-6 lg:gap-10 overflow-x-auto py-2">

    <Link to="/shop/accessories" className="shrink-0">
      <li className="flex flex-col items-center justify-center border-2 border-gray-300 rounded-[15px] h-46 w-46 bg-white hover:shadow-lg hover:-translate-y-1 transition duration-200">
        <img src={accessiors} alt="accessories" className="h-28 w-38 object-contain mb-2" />
        <span className="text-lg font-medium">Accessories</span>
      </li>
    </Link>

    <Link to="/shop/keyboard" className="shrink-0">
      <li className="flex flex-col items-center justify-center border-2 border-gray-300 rounded-[15px] h-46 w-46 bg-white hover:shadow-lg hover:-translate-y-1 transition duration-200">
        <img src={keyboard} alt="keyboard" className="h-28 w-28 object-contain mb-2" />
        <span className="text-lg font-medium">Keyboard</span>
      </li>
    </Link>

    <Link to="/shop/mouse" className="shrink-0">
      <li className="flex flex-col items-center justify-center border-2 border-gray-300 rounded-[15px] h-46 w-46 bg-white hover:shadow-lg hover:-translate-y-1 transition duration-200">
        <img src={mouse} alt="mouse" className="h-28 w-28 object-contain mb-2" />
        <span className="text-lg font-medium">Mouse</span>
      </li>
    </Link>

    <Link to="/shop/headset" className="shrink-0">
      <li className="flex flex-col items-center justify-center border-2 border-gray-300 rounded-[15px] h-46 w-46 bg-white hover:shadow-lg hover:-translate-y-1 transition duration-200">
        <img src={headset} alt="headset" className="h-28 w-28 object-contain mb-2" />
        <span className="text-lg font-medium">Headset</span>
      </li>
    </Link>

    <Link to="/shop/mousepad" className="shrink-0">
      <li className="flex flex-col items-center justify-center border-2 border-gray-300 rounded-[15px] h-46 w-46 bg-white hover:shadow-lg hover:-translate-y-1 transition duration-200">
        <img src={mousepad} alt="mousepad" className="h-32 w-32 object-contain mb-2" />
        <span className="text-lg font-medium">Mousepad</span>
      </li>
    </Link>

  </ul>
</div>
  )
}

export default Categore
