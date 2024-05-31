"use client";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {
  const [amount, setAmount] = useState(0);
  const [url, setUrl] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const handlePay = async () => {
    const payed = await axios.post("/api/paypay", { amount });
    console.log(payed.data.BODY.data.url);
    setUrl(payed.data.BODY.data.url);
  };

  return (
    <div>
      <input
        type="number"
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <button onClick={handlePay}>支払う</button>
      <div>{url && <a href={url}>支払いリンク</a>}</div>
    </div>
  );
}
