export async function fetchUserSecret() {
  const response = await fetch(`http://localhost:8000/payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      currency: "bgn",
    }),
  });
  const { clientSecret } = await response.json();

  return clientSecret;
}
