"use client";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [amount, setAmount] = useState(0);
  const [url, setUrl] = useState("");
  const handlePay = async () => {
    const payed = await axios.post("/api/paypay", { amount });
    setUrl(payed.data.BODY.data.url);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">支払い</h1>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="border-2 border-gray-300 p-2 rounded w-full"
          placeholder="金額を入力"
        />
        <button
          onClick={handlePay}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          支払う
        </button>
        {url && (
          <a
            href={url}
            className="block mt-4 bg-green-500 hover:bg-green-700 text-white text-center font-bold py-2 px-4 rounded"
          >
            支払いリンク
          </a>
        )}
      </div>
    </div>
  );
}
