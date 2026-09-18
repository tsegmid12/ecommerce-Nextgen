import React, { useEffect, useState } from "react";
import poster from "../assets/banner.webp";
import poster2 from "../assets/poster2.webp";
import poster3 from "../assets/poster3.webp";
import Categore from "./Categore.jsx";
import TopSeller from "../Components/TopSeller.jsx";
import ProductList from "../Components/ProductList.jsx";

const banners = [poster, poster2, poster3];

const Home = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f7f7] pb-20 sm:pb-30">
      <main className="pt-24 sm:pt-28 md:pt-32 lg:pt-40">

        {/* ================= BANNER ================= */}
        <section className="relative mx-auto mt-20 w-[94%] overflow-hidden rounded-xl shadow-sm sm:mt-6 sm:rounded-2xl md:mt-8 lg:w-[95%]">

          <div
            className="flex transition-transform duration-1000 ease-in-out"
            style={{
              transform: `translateX(-${current * 100}%)`,
            }}
          >
            {banners.map((banner, index) => (
              <img
                key={index}
                src={banner}
                alt={`Banner ${index + 1}`}
                className="
                  block
                  h-full
                  w-full
                  object-cover

                  sm:h-56
                  md:h-72
                  lg:h-96
                  xl:h-120
                "
              />
            ))}
          </div>

          {/* Previous */}
          <button
            type="button"
            onClick={() =>
              setCurrent(
                (prev) => (prev - 1 + banners.length) % banners.length
              )
            }
            className="
              absolute left-2 top-1/2
              flex h-6 w-6
              -translate-y-1/2
              justify-center 
              rounded-full
              bg-black/25
              text-xl text-white
              backdrop-blur-sm
              transition-all
              hover:scale-105 hover:bg-black/50
              sm:left-3 sm:h-9 sm:w-9 sm:text-2xl
              md:left-5 md:h-11 md:w-11 md:text-3xl
            "
          >
            ‹
          </button>

          {/* Next */}
          <button
            type="button"
            onClick={() =>
              setCurrent((prev) => (prev + 1) % banners.length)
            }
            className="
              absolute right-2 top-1/2
              flex h-6 w-6
              -translate-y-1/2
              justify-center
              rounded-full
              bg-black/25
              text-xl text-white
              backdrop-blur-sm
              transition-all
              hover:scale-105 hover:bg-black/50
              sm:right-3 sm:h-9 sm:w-9 sm:text-2xl
              md:right-5 md:h-11 md:w-11 md:text-3xl
            "
          >
            ›
          </button>

          {/* Dots */}
          <div
            className="
              absolute bottom-2 left-1/2
              flex -translate-x-1/2
              items-center gap-1.5
              sm:bottom-3 sm:gap-2
              md:bottom-5
            "
          >
            {banners.map((_, index) => (
              <button
                type="button"
                key={index}
                onClick={() => setCurrent(index)}
                aria-label={`Go to banner ${index + 1}`}
                className={`
                  h-1.5
                  rounded-full
                  transition-all duration-500
                  sm:h-2
                  md:h-2.5

                  ${
                    current === index
                      ? "w-5 bg-white sm:w-6 md:w-8"
                      : "w-1.5 bg-white/50 hover:bg-white/80 sm:w-2 md:w-2.5"
                  }
                `}
              />
            ))}
          </div>
        </section>

        {/* ================= CATEGORY ================= */}
        <Categore />

        {/* ================= TOP SELLER ================= */}
        <TopSeller />

        {/* ================= MOUSE ================= */}
        <section className="mx-auto mt-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
              Mouse
            </h1>

            <div className="mt-2 h-1 w-12 rounded-full bg-blue-500 sm:w-14" />
          </div>

          <ProductList
            defaultCategory="mouse"
            showFilter={false}
          />
          <section className="mx-auto -mt-60 w-full max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
              Keyboard
            </h1>

            <div className="mt-2 h-1 w-12 rounded-full bg-blue-500 sm:w-14" />
          </div>

          <ProductList
            defaultCategory="keyboard"
            showFilter={false}
          />

        </section>


        </section>

      </main>
    </div>
  );
};

export default Home;