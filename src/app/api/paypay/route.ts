import { NextResponse } from "next/server";
import crypto from "crypto"; // Importing crypto for generating unique IDs
import PAYPAY from "@paypayopa/paypayopa-sdk-node"; // Importing PayPay SDK
const { v4: uuidv4 } = require("uuid");
// POST Handler
// Configuring the PayPay SDK
PAYPAY.Configure({
  clientId: process.env.PAYPAY_API_KEY || "",
  clientSecret: process.env.PAYPAY_SECRET || "",
  merchantId: process.env.MERCHANT_ID,
  // productionMode: process.env.NODE_ENV === "production", // Automatically set based on environment
});
export async function POST(request: Request) {
  const { amount } = await request.json(); // Extracting amount from request
  const merchantPaymentId = uuidv4(); // 支払いID（一意になるようにuuidで生成）
  const orderDescription = "画像生成のための料金"; // Description of the order
  const payload = {
    merchantPaymentId: merchantPaymentId,
    amount: {
      amount: parseInt(amount),
      currency: "JPY",
    },
    codeType: "ORDER_QR",
    orderDescription: orderDescription,
    isAuthorization: false,
    redirectUrl: `http://localhost:3002/${merchantPaymentId}`, // Redirect URL
    redirectType: "WEB_LINK",
  };

  try {
    const response = await PAYPAY.QRCodeCreate(payload); // Attempting to create a payment
    return NextResponse.json(response); // Sending response back to client
  } catch (error) {
    console.error("PayPay Payment Error:", error); // Logging the error
    return new NextResponse(
      JSON.stringify({
        error: "支払いに失敗しました",
      }),
      {
        status: 400,
      }
    );
  }
}
