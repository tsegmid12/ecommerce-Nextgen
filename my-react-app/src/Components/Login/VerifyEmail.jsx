import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const VerifyEmail = () => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const userId = location.state?.userId;
  console.log("userId:", userId); 

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_URL}/api/verify-email`,
        {
          userId,
          code,
        }
      );

      setMessage(response.data.message);

      navigate("/home");

    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Алдаа гарлаа"
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form
        onSubmit={handleVerify}
        className="w-full max-w-md rounded-2xl border bg-white p-6 shadow"
      >
        <h2 className="mb-2 text-2xl font-bold">
          Email баталгаажуулах
        </h2>

        <p className="mb-5 text-sm text-gray-500">
          Таны Gmail рүү 6 оронтой код илгээгдсэн.
        </p>

        <input
          type="text"
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="6 оронтой код"
          className="mb-4 w-full rounded-xl border px-4 py-3"
        />

        <button
          type="submit"
          className="w-full rounded-xl bg-blue-500 py-3 font-semibold text-white hover:bg-blue-600"
        >
          Баталгаажуулах
        </button>

        {message && (
          <p className="mt-4 text-center text-sm">
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default VerifyEmail;