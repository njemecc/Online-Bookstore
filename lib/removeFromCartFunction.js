export default async ({ email, name }) => {
  try {
    const res = await fetch("/api/removeBookFromCart", {
      method: "POST",
      body: JSON.stringify({ email, name }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await res.json();

    return response;
  } catch (error) {
    console.log("grska iz poziva funkcije 'removeBookFromCart':", error);
  }
};
