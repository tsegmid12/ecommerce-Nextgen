import React, { useState, useEffect } from "react";
import axios from "axios";


const AccComp = ({ active }) => {
  const userName = localStorage.getItem("username");


  const [showModalPhone, setShowModalPhone] = useState(false);
  const [showModalAddress, setShowModalAddress] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [newaddress, setAddress] = useState( "");
  const [newphone, setPhone] = useState( "");
  const [newEmail, setEmail] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/userinfo", {
      headers:{
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    }).then(response =>{
      const { email, address, phone } = response.data;
      setEmail(email || "");
      setAddress(address || "");
      setPhone(phone || "");
    }).catch(error => {
      console.error("Error fetching user info:", error);
    })
  }, [])

const handleSaveEmail = async () => {
      const token = localStorage.getItem("token");
      if(!token) {
        alert("Та эхлээд нэвтэрнэ үү");
        return;
      }
      await axios.post(`http://localhost:5000/api/userinfo`, { email: newEmail }, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }).then(response => {
        console.log("Email saved successfully:", response.data);
        window.location.reload();
      })  .catch((error) => {
        console.error("Login error:", error.response?.data || error.message);
        alert(error.response?.data?.message || "Нэвтрэхэд алдаа гарлаа");
      })
  }


  const handleSavePhone = async () => {
    try{
      const token = localStorage.getItem("token");
      if(!token) {
        alert("Та эхлээд нэвтэрнэ үү");
        return;
      } 

      await axios.post(`http://localhost:5000/api/userinfo`, { phone: newphone }, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      window.location.reload();
    }
    catch(error){
      console.error("Error saving phone number:", error.message);
    }
  }

  const handleSaveAddress = async () => {
    try{
      const token = localStorage.getItem("token");
      if(!token) {
        alert("Та эхлээд нэвтэрнэ үү");
        return;
      }
      await axios.post(`http://localhost:5000/api/userinfo`, {
         address: newaddress
        }, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      window.location.reload();
    }
    catch (error) {
      console.error("Error saving address:", error.message);
    }
  }

  if (active !== 0) {
    return null;
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">

      {!userName ? (
        /* Not logged in */
        <div className="flex min-h-100 items-center justify-center rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-2xl">
              👤
            </div>

            <h1 className="mt-4 text-2xl font-bold text-gray-800">
              Нэвтрээгүй байна
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Мэдээллээ харахын тулд эхлээд нэвтэрнэ үү.
            </p>

          </div>
        </div>
      ) : (
        /* Profile */
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">

          {/* Profile Header */}
          <div className="flex items-center gap-4 border-b border-gray-100 pb-6">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xl font-bold text-blue-500">
              {userName.charAt(0).toUpperCase()}
            </div>

            <div>
              <h1 className="text-xl font-bold text-gray-800">
                {userName}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Хувийн мэдээлэл
              </p>
            </div>

          </div>

          {/* Email */}
          <div className="mt-6">

            <div className="flex items-center justify-between gap-3">

              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Имэйл хаяг
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Таны бүртгэлтэй имэйл
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="cursor-pointer rounded-xl bg-green-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-green-600 hover:shadow-md active:translate-y-0"
              >
                {newEmail ? "Засах" : "Нэмэх"}
              </button>

            </div>

            <div className="mt-3 rounded-xl border border-gray-200 bg-[#f7f7f7] px-4 py-3 text-sm text-gray-700">
              {newEmail || "Имэйл хаяг нэмээгүй байна"}
            </div>

          </div>

          {/* Address */}
          <div className="mt-7">

            <div className="flex items-center justify-between gap-3">

              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Хаяг
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Хүргэлтийн хаяг
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowModalAddress(true)}
                className="cursor-pointer rounded-xl bg-green-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-green-600 hover:shadow-md active:translate-y-0"
              >
                {newaddress ? "Засах" : "Нэмэх"}
              </button>

            </div>

            <div className="mt-3 rounded-xl border border-gray-200 bg-[#f7f7f7] px-4 py-3 text-sm text-gray-700">
              {newaddress || "Нэмсэн хаяг байхгүй байна"}
            </div>

          </div>

          {/* Phone */}
          <div className="mt-7">

            <div className="flex items-center justify-between gap-3">

              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Утасны дугаар
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Холбоо барих утас
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowModalPhone(true)}
                className="cursor-pointer rounded-xl bg-green-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-green-600 hover:shadow-md active:translate-y-0"
              >
                {newphone ? "Засах" : "Нэмэх"}
              </button>

            </div>

            <div className="mt-3 rounded-xl border border-gray-200 bg-[#f7f7f7] px-4 py-3 text-sm text-gray-700">
              {newphone || "Нэмсэн дугаар байхгүй байна"}
            </div>

          </div>

        </div>
      )}

      {/* Email Modal */}
      {showModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8">

            <h2 className="text-xl font-bold text-gray-800">
              Имэйл хаяг
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Имэйл хаягаа оруулна уу
            </p>

            <input
              type="email"
              value={newEmail}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="mt-5 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />

            <div className="mt-5 flex justify-end gap-3">

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="cursor-pointer rounded-xl bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-200"
              >
                Болих
              </button>

              <button
                type="button"
                onClick={handleSaveEmail}
                className="cursor-pointer rounded-xl bg-green-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-green-600 hover:shadow-md"
              >
                Хадгалах
              </button>

            </div>

          </div>

        </div>
      )}

      {/* Address Modal */}
      {showModalAddress && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8">

            <h2 className="text-xl font-bold text-gray-800">
              Хаяг
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Хүргэлтийн хаягаа оруулна уу
            </p>

            <textarea
              value={newaddress}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Улаанбаатар, Сүхбаатар дүүрэг..."
              rows="4"
              className="mt-5 w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />

            <div className="mt-5 flex justify-end gap-3">

              <button
                type="button"
                onClick={() => setShowModalAddress(false)}
                className="cursor-pointer rounded-xl bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-200"
              >
                Болих
              </button>

              <button
                type="button"
                onClick={handleSaveAddress}
                className="cursor-pointer rounded-xl bg-green-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-green-600 hover:shadow-md"
              >
                Хадгалах
              </button>

            </div>

          </div>

        </div>
      )}

      {/* Phone Modal */}
      {showModalPhone && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8">

            <h2 className="text-xl font-bold text-gray-800">
              Утасны дугаар
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Холбоо барих утсаа оруулна уу
            </p>

            <input
              type="tel"
              value={newphone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="99112233"
              className="mt-5 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />

            <div className="mt-5 flex justify-end gap-3">

              <button
                type="button"
                onClick={() => setShowModalPhone(false)}
                className="cursor-pointer rounded-xl bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-200"
              >
                Болих
              </button>

              <button
                type="button"
                onClick={handleSavePhone}
                className="cursor-pointer rounded-xl bg-green-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-green-600 hover:shadow-md"
              >
                Хадгалах
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default AccComp;