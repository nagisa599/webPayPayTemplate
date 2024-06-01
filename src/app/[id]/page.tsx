"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Page = ({ params }: { params: { id: number } }) => {
  const [paymentStatus, setPaymentStatus] = useState("PENDING"); // Default to PENDING until first check

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .post("/api/checkPaymentStatus", { id: params.id })
        .then((response) => {
          const { status } = response.data;
          setPaymentStatus(status);
          console.log(status);
          if (status === "COMPLETED" || status === "FAILED") {
            clearInterval(interval); // Stop polling when transaction completes or fails
          }
        })
        .catch((error) => {
          console.error("Failed to check payment status:", error);
          clearInterval(interval); // Also stop polling on error
        });
    }, 4500); // Check status every 4.5 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [params.id]);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="p-5 bg-white rounded-lg shadow-lg">
        <h1 className="text-lg font-bold text-center mb-4">Payment Status</h1>
        <div className="text-center p-3 rounded bg-gray-200 text-gray-700">
          {paymentStatus}
        </div>
        {paymentStatus === "COMPLETED" && (
          <div className="mt-4 p-3 rounded bg-green-500 text-white text-center">
            Payment completed successfully!
          </div>
        )}
        {paymentStatus === "FAILED" && (
          <div className="mt-4 p-3 rounded bg-red-500 text-white text-center">
            Payment failed. Please try again.
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
