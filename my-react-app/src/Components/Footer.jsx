import React from "react";
import facebookIcon from "../assets/facebook.png";
import instagramIcon from "../assets/instagram.png";

const Footer = () => {
  return (
    <footer className="bg-[#f7f7f7] px-4 pb-8 pt-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 px-6 py-10 sm:grid-cols-2 sm:px-10 lg:grid-cols-3 lg:px-12">

          {/* Contact */}
          <div>
            <h2 className="text-lg font-bold text-gray-800">
              NextGen Store
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-6 text-gray-500">
              Технологийн бүтээгдэхүүн, аксессуаруудыг нэг дороос.
            </p>

            <div className="mt-5">
              <p className="text-sm font-semibold text-gray-800">
                Бидэнтэй холбогдох
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Утас:{" "}
                <a
                  href="tel:+97680744042"
                  className="font-medium text-gray-700 transition hover:text-blue-500"
                >
                  +976 80744042
                </a>
              </p>
            </div>
          </div>

          {/* Social */}
          <div>
            <h2 className="text-lg font-bold text-gray-800">
              Сошиал хаягууд
            </h2>

            <div className="mt-5 flex flex-col gap-4">

              <a
                href="https://www.facebook.com/profile.php?id=61587903984341"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-fit items-center gap-3 text-sm font-medium text-gray-600 transition hover:text-blue-500"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-50">
                  <img
                    src={facebookIcon}
                    alt="Facebook"
                    className="h-5 w-5 object-contain"
                  />
                </span>
                <span>NextGen Store</span>
              </a>

              <a
                href="https://www.instagram.com/nextgen.str/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-fit items-center gap-3 text-sm font-medium text-gray-600 transition hover:text-pink-500"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-50">
                  <img
                    src={instagramIcon}
                    alt="Instagram"
                    className="h-5 w-5 object-contain"
                  />
                </span>
                <span>NextGen Store</span>
              </a>

            </div>
          </div>

          {/* Store Info */}
          <div>
            <h2 className="text-lg font-bold text-gray-800">
              NextGen Store
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Gaming болон компьютерийн тоног төхөөрөмжийн
              сонголтуудыг танд хүргэнэ.
            </p>

            <div className="mt-5 inline-flex rounded-full bg-gray-50 px-4 py-2 text-xs font-medium text-gray-500">
              © 2026 NextGen Store
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-gray-100 px-6 py-5 sm:px-10 lg:px-12">
          <p className="text-center text-xs text-gray-400">
            © 2026 NextGen Store. Бүх эрх хуулиар хамгаалагдсан.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;