export default async (email) => {
  try {
    const res = await fetch("/api/clearCart", {
      method: "POST",
      body: JSON.stringify(email),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await res.json();

    return response;
  } catch (error) {
    console.log("greska iz addBookToCart funkcije:", error);
  }
};
