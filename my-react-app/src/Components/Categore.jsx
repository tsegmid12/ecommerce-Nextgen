import React from 'react'
import keyboard from '../assets/keyboard.png'
import mouse from '../assets/mouse.png'
import headset from '../assets/headset.png'
import mousepad from '../assets/mousepad.png'
import accessiors from '../assets/accesiors.webp'
import { Link } from 'react-router-dom'

const Categore = () => {
  return (
    <div>
        <ul className="flex justify-center gap-10 mt-20">
            <Link to="/shop/accessories">
            <li className="justify-items-center gap-2 border-2 border-gray-300 rounded-[15px] h-46 w-46 bg-white">
            <img
                src={accessiors}
                alt="accessiors"
                className="h-28 w-38 mt-3 mb-3"
            />
            <span className="flex justify-center text-lg font-medium">
                Accessiors
            </span>
            </li>
            </Link>

            <Link to="/shop/keyboard">
            <li className="justify-items-center border-2 border-gray-300 rounded-[15px] h-46 w-46 bg-white">
            <img
                src={keyboard}
                alt="keyboard"
                className="h-28 w-28 mt-3 mb-3"
            />
            <span className="flex justify-center text-lg font-medium">
                Keyboard
            </span>
            </li>
            </Link>

            <Link to="/shop/mouse">
            <li className="justify-items-center gap-2 border-2 border-gray-300 rounded-[15px] h-46 w-46 bg-white">
            <img
                src={mouse}
                alt="mouse"
                className="h-28 w-28 mt-3 mb-3"
            />
            <span className="flex justify-center text-lg font-medium">
                Mouse
            </span>
            </li>
            </Link>
            
            <Link to="/shop/headset">
            <li className="justify-items-center gap-2 border-2 border-gray-300 rounded-[15px] h-46 w-46 bg-white">
            <img
                src={headset}
                alt="headset"
                className="h-28 w-28 mt-3 mb-3"
            />
            <span className="flex justify-center text-lg font-medium">
                Headset
            </span>
            </li>
            </Link>
    
            <Link to="/shop/mousepad">
            <li className="justify-items-center   gap-2 border-2 border-gray-300 rounded-[15px] h-46 w-46 bg-white">
            <img
                src={mousepad}
                alt="mousepad"
                className="h-40 w-40 -mt-3 -mb-5"
            />
            <span className="flex justify-center text-lg font-medium">
                Mousepad
            </span>
            </li>
            </Link>
        </ul>
    </div>
  )
}

export default Categore
