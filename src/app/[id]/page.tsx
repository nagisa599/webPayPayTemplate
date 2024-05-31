"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Page = ({ params }: { params: { id: number } }) => {
  const [paymentStatus, setPaymentStatus] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .post("/api/checkPaymentStatus", { id: params.id })
        .then((response) => {
          setPaymentStatus(response.data.status);
          console.log(response.data.status);
          if (
            response.data.status === "COMPLETED" ||
            response.data.status === "FAILED"
          ) {
            clearInterval(interval); // 取引が完了または失敗した場合はポーリングを停止
          }
        })
        .catch((error) => {
          console.error("Failed to check payment status:", error);
          clearInterval(interval); // 取引が完了または失敗した場合はポーリングを停止
        });
    }, 4500); // 4.5秒ごとにステータスをチェック

    return () => clearInterval(interval); // コンポーネントアンマウント時にインターバルをクリア
  }, [params.id]);
  return (
    <div>
      <h1>Payment Status: {paymentStatus}</h1>
    </div>
  );
};

export default Page;
