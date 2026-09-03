import trash_can from '../../assets/trash-can.png'
import heart from '../../assets/heart.png';
import heart_full from '../../assets/heart-full.png';
import { useState, React } from 'react'


    const CartList = ({product}) => {

    const [count, setCount] = useState(product.count > 0 ? 1 : 0);
    const [wishlist, setWishlist] = useState(product.wishlist); 

    return (
    <>
      {product.cart && (<div className="flex items-center  border shadow border-gray-400 rounded-[15px] h-40 my-10 ml-20 w-250 bg-white">
  
          <div className='w-50 mt-2'> 
              <img src={product.image} alt={product.name}className="h-40 justify-self-center"/>
          </div>
          <div className='ml-20 w-60'>
              <h2 className="mt-3 -mb-2  text-lg font-bold">{product.name}</h2>
              <span className="text-[10px] mr-4">{product.status}</span>
              <span className="text-[10px]">Хүргэлт А бүсэд үнэгүй</span>
              <p className="text-sm ml-8 mt-2  text-[10px]">үлдэгдэл {product.count - count}</p>
              <div className="flex justify-between items-center mt-2 w-30 h-8 bg-[#eeeeee] rounded-4xl">
                  {product.count === 0 ? (<p></p>) : <button onClick={() => setCount(count - 1)} disabled={count === 1} className='px-6 cursor-pointer hover:font-bold'>-</button>}

                  {product.count === 0 ? ( 
                      <p className="flex text-red-500">Бараа дууссан</p>
                  ) : (<span className="text-lx font-semibold self-center">{count}</span>)}

                  {product.count === 0 ? (<p></p>) : <button onClick={() => setCount(count + 1)} disabled={count >= product.count} className='px-6 cursor-pointer hover:font-bold'>+</button>}

              </div>
          </div>
      
          <div className='ml-80 '>
              <p className="text-3xl font-bold ">{product.price}₮</p>

              <button onClick={() => setWishlist(!wishlist)} className='mt-2 mx-4'>
                  {wishlist === false ? (<img src={heart} alt="heart" className="h-6"/>) : (<img src={heart_full} alt="heart" className="h-6"/>)}
              </button>
              <button className='mt-2'><img src={trash_can} alt="trash" className="h-6"/></button>
          </div>
          
      </div>
    )}

  </>

  )
}

export default CartList
