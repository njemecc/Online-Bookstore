export default async (data) => {
  try {
    const res = await fetch("/api/addBookToCart", {
      method: "POST",
      body: JSON.stringify(data),
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
