import React from "react";
import keyboard from "../assets/keyboard.png";
import mouse from "../assets/mouse.png";
import headset from "../assets/headset.png";
import mousepad from "../assets/mousepad.png";
import accessiors from "../assets/accesiors.webp";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Accessories",
    image: accessiors,
    path: "/shop/accessories",
  },
  {
    name: "Keyboard",
    image: keyboard,
    path: "/shop/keyboard",
  },
  {
    name: "Mouse",
    image: mouse,
    path: "/shop/mouse",
  },
  {
    name: "Headset",
    image: headset,
    path: "/shop/headset",
  },
  {
    name: "Mousepad",
    image: mousepad,
    path: "/shop/mousepad",
  },
];

const Categore = () => {
  return (
    <section className="mt-12 w-full px-4 sm:mt-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-6 flex items-end justify-between sm:mb-8">
          <div>

            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Ангилал
            </h2>

            <div className="mt-2 h-1 w-10 rounded-full bg-blue-500 sm:w-14" />
          </div>

          <Link to="/shop" className="hidden text-sm font-semibold text-blue-500 transition hover:text-blue-600 hover:scale-105 sm:block">
            Бүгдийг харах →
          </Link>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5 lg:gap-5">
          {categories.map((category, index) => (
            <Link key={category.name} to={category.path} className={`group ${index === 4 ? "col-span-2 sm:col-span-1" : ""}`}>
              <div className="relative flex h-44 w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl sm:h-52 sm:p-5">

                {/* Background */}
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-50 transition-all duration-500 group-hover:scale-[2.5] group-hover:bg-blue-100" />

                <div className="pointer-events-none absolute -bottom-10 -left-10 h-24 w-24 rounded-full bg-gray-50 transition-all duration-500 group-hover:scale-150" />

                {/* Number */}
                <span className="absolute left-4 top-4 text-xs font-bold text-gray-300 transition duration-300 group-hover:text-blue-400">
                  0{index + 1}
                </span>

                {/* Image */}
                <div className="relative z-10 flex h-24 w-full items-center justify-center sm:h-28">
                  <img src={category.image} alt={category.name} className="max-h-full max-w-[85%] object-contain transition-all duration-500 group-hover:scale-110" />
                </div>

                {/* Name */}
                <div className="relative z-10 mt-3 text-center">
                  <h3 className="text-sm font-bold text-gray-800 transition duration-300 group-hover:text-blue-600 sm:text-base">
                    {category.name}
                  </h3>

                  <div className="mx-auto mt-1 h-0.5 w-0 rounded-full bg-blue-500 transition-all duration-300 group-hover:w-8" />
                </div>

                {/* Arrow */}
                <span className="absolute bottom-4 right-4 flex h-7 w-7 items-center justify-center rounded-full bg-gray-50 text-xs text-gray-400 transition-all duration-300 group-hover:bg-blue-500 group-hover:text-white">
                  →
                </span>

              </div>
            </Link>
          ))}
        </div>

        {/* Mobile link */}
        <Link to="/shop" className="mt-5 flex items-center justify-center text-sm font-semibold text-gray-500 transition hover:text-blue-600 sm:hidden">
          Бүх ангиллыг харах →
        </Link>

      </div>
    </section>
  );
};

export default Categore;