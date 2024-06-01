import PAYPAY from "@paypayopa/paypayopa-sdk-node"; // Importing PayPay SDK
PAYPAY.Configure({
  clientId: process.env.PAYPAY_API_KEY || "",
  clientSecret: process.env.PAYPAY_SECRET || "",
  merchantId: process.env.MERCHANT_ID,
  // productionMode: process.env.NODE_ENV === "production", // Automatically set based on environment
});
export async function POST(request: Request) {
  const { id } = await request.json(); // 支払いIDをリクエストから取得
  console.log(id);
  try {
    const response = await PAYPAY.GetCodePaymentDetails([id]);
    const body = response.BODY;

    return new Response(JSON.stringify(body.data)); // レスポンスを返す
  } catch (error) {
    console.error("Failed to check payment status:", error);
    return new Response("Failed to check payment status", {
      status: 400,
    });
  }
}
