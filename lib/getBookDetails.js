export default async (id) => {
  try {
    const res = await fetch("/api/getBookDetails", {
      method: "POST",
      body: JSON.stringify(id),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await res.json();

    return response;
  } catch (error) {
    console.log("greska iz getBookDetails funkcije:", error);
  }
};
