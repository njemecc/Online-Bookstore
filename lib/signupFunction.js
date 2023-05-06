

export default async (data) => {
    try {
        const res = await fetch("/api/signup",{
            method:"POST",
            body: JSON.stringify(data),
              headers: {
                "Content-Type": "application/json",
              },

        })

       const response = await res.json()

        return response
    } catch (error) {
        console.log("grska iz poziva funkcije:",error)
    }

}