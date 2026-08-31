import React from 'react'
import poster from '../assets/banner.webp'
import Categore from './Categore.jsx'
import TopSeller from '../Components/TopSeller.jsx'
import ProductList from '../Components/ProductList.jsx'
const Home = () => {
  return (
    <div className="min-h-screen bg-[#f7f7f7] pb-30">
       {/* Banner */}
      <main className="pt-40">
      <img
        src={poster}
        alt="ATK Zero"
        className="block w-[95%] h-120 object-cover mx-auto mt-12 rounded-[20px] "
      />
      <Categore />
      <TopSeller/>
      <h1 className="text-3xl font-bold mt-10 ml-30">Mouse</h1>
      <ProductList defaultCategory="mouse" showFilter={false}/>
    </main>
     
    </div>
  )
}

export default Home
