import axios from "axios";

export async function checkPaymentStatus(id, jsonResponse, cartInfo) {
  const stripeResponse = await axios.post("http://localhost:8000/payment", {
    email: "andybuhchev@gmail.com",
    product: cartInfo,
    authToken: jsonResponse,
  });
  if (stripeResponse) {
    const { paid } = stripeResponse.data;
    if (paid === true) {
      subscribe(id, true);
      return "Payment Success";
    } else {
      return "Payment failed due to some issue";
    }
  } else {
    return "Payment failed due to some issue";
  }
}
