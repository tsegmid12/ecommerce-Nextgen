import heart from '../assets/heart.png';
import heart_full from '../assets/heart-full.png';
import { useState } from 'react';
const ProductCard = ({ product }) => {

  const [wishlist, setWishlist] = useState(product.wishlist);

  return (
<div className="group relative w-full max-w-sm
                overflow-hidden
                rounded-2xl
                border border-gray-200
                bg-[#f7f7f7]
                shadow-sm
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-xl">

  {/* Image */}
  <div className="relative mx-3 mt-3
                  h-64
                  rounded-xl
                  bg-white
                  border border-gray-100
                  flex items-center justify-center
                  overflow-hidden">

    {/* Wishlist */}
    <button
      onClick={() => setWishlist(!wishlist)}
      className="absolute right-4 top-4 z-10
                 flex h-9 w-9 items-center justify-center
                 rounded-full bg-white
                 border border-gray-100
                 shadow-sm
                 hover:scale-110
                 transition"
    >
      <img
        src={wishlist ? heart_full : heart}
        alt="wishlist"
        className="h-5 w-5"
      />
    </button>

    <img
      src={product.image}
      alt={product.name}
      className="h-52 w-full object-contain
                 transition-transform duration-300
                 group-hover:scale-105"
    />
  </div>

  {/* Info */}
  <div className="px-4 pt-4 pb-5">

    <h2 className="text-lg font-bold text-gray-800 truncate">
      {product.name}
    </h2>

    <p className="mt-1 text-xl font-bold text-gray-900">
      {product.price.toLocaleString()}₮
    </p>

    <div className="mt-4 flex flex-col gap-2">

      <button
        className="w-full rounded-xl
                   bg-white
                   border border-gray-300
                   py-2.5
                   font-semibold text-gray-700
                   hover:bg-gray-100
                   transition"
      >
        Сагсанд нэмэх
      </button>

      <button
        className="w-full rounded-xl
                   bg-green-600
                   py-2.5
                   font-semibold text-white
                   hover:bg-green-500
                   transition"
      >
        Худалдан авах
      </button>

    </div>
  </div>

</div>
  );
};

export default ProductCard;