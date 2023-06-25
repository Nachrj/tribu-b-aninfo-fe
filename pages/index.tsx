import { Inter } from "next/font/google"
import { useEffect } from "react"
import { BASE_URL } from "./soporte/constants"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {

  useEffect(() => {
    fetch(`${BASE_URL}/v1/clients`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(response => {
      return response.json()
    })
    .then(data => {
      console.log("data data", data);
    })
  }, [])

  return (
    <div className="flex h-full flex-col justify-center items-center bg-white">
      <h1 className="text-4xl mb-5 font-bold">Home</h1>
      <span className="text-7xl">🏡</span>
    </div>
  )
}
