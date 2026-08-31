import heart from '../assets/heart.png';
import heart_full from '../assets/heart-full.png';
import { useState } from 'react';
const ProductCard = ({ product }) => {

  const [wishlist, setWishlist] = useState(product.wishlist);

  return (
    <div className="flex flex-col items-center  border-2 border-gray-300 rounded-[15px] h-112  w-86 bg-white">
      
        <div className='bg-[#f7f7f7]  rounded-lg mt-2 w-78'> 
          <button onClick={() => setWishlist(!wishlist)}>
            {wishlist === true ? (<img src={heart_full} alt="heart" className=" ml-68 mt-4 h-6"/>) : (<img src={heart} alt="heart" className=" mt-4 ml-68 h-6"/>)}
          </button>
            <img src={product.image} alt={product.name}className="h-60 -mt-6 justify-self-center"/>
        </div>

        <h2 className="mt-3 text-lg font-bold">{product.name}</h2>

        <p>{product.price}₮</p>

        <button className="mt-3 bg-[#d9d9d9] h-8 w-70 rounded-xl ">Сагсанд нэмэх</button>
        <button className="mt-3 bg-green-600 text-white h-8 w-70 rounded-xl hover:bg-green-400">Худалдан авах</button>
    </div>
  );
};

export default ProductCard;