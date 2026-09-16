import React from 'react'
import {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddProduct = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [count, setCount] = useState('');
  const [status, setStatus] = useState('');
  const [sold, setSold] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, [])

  const handleAdd = (e) =>{
    e.preventDefault();
    axios.post('http://localhost:5000/api/products', {
      name: name,
      description: description,
      price: price,
      image: image,
      category: category.toLowerCase(),
      count: count,
      status: status,
      sold: sold
    }).then((response) => {
      alert("Амжилттай нэмэгдлээ");
    })
    .catch((error) => {
      console.error(error);
    })
  }
  return (
    <div className="min-h-screen bg-[#f7f7f7] flex items-center justify-center px-4 py-10">
  <form
    className="w-full max-w-2xl bg-white border border-gray-200 rounded-3xl shadow-xl p-8 sm:p-10"
  >
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-gray-800">
        Add Product
      </h2>
      <p className="text-gray-500 mt-2">
        Шинэ бүтээгдэхүүн нэмэх
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

      {/* Name */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product name"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2 sm:col-span-2">
        <label className="text-sm font-semibold text-gray-700">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Product description"
          rows="3"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none resize-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>

      {/* Price */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">
          Price
        </label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>

      {/* Category */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">
          Category
        </label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
        >
          <option value="">Select category</option>
          <option value="Mouse">Mouse</option>
          <option value="Keyboard">Keyboard</option>
          <option value="Headset">Headset</option>
          <option value="Mousepad">Mousepad</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>

      {/* Image */}
      <div className="flex flex-col gap-2 sm:col-span-2">
        <label className="text-sm font-semibold text-gray-700">
          Image URL
        </label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

        {/* Image Preview */}
        {image && (
          <div className="mt-3 flex justify-center">
            <div className="w-full max-w-xs overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
              <img
                src={image}
                alt="Product preview"
                className="h-48 w-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Count */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">
          Count
        </label>
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          placeholder="Stock"
          min="0"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>

      {/* Sold */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">
          Sold
        </label>
        <input
          type="number"
          value={sold}
          onChange={(e) => setSold(e.target.value)}
          placeholder="Sold"
          min="0"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>
    
      {/* Status */}
      <div className="flex flex-col gap-2 sm:col-span-2">
        <label className="text-sm font-semibold text-gray-700">
          Status
        </label>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
          required
        >
          <option value="">Select status</option>
          <option value="available">Шинэ</option>
          <option value="out_of_stock">Хэрэглэж байсан</option>
          <option value="unavailable">Бараг шинэ</option>
        </select>
      </div>


    </div>


    <button
      type="submit"
      onClick={(e) => {handleAdd(e); navigate('/admin/products')}}
      className="w-full mt-8 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition duration-200 active:scale-[0.98] shadow-md hover:shadow-lg"
    >
      Add Product
    </button>

  </form>
</div>
  )
}

export default AddProduct
