import Image from "next/image"
import { Inter } from "next/font/google"
import { useEffect } from "react"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {

  useEffect(() => {
    fetch("http://localhost:5001/v1/tickets", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: "",
    })
    .then((res) => {
      console.log("res", res)
      return res.json()
    })
    .then((data) => {
      console.log("data", data)
      console.log("List 2")
    })
  }, [])

  return (
    <div className="flex h-full flex-col justify-center items-center bg-black">
      <h1 className="text-4xl mb-5 font-bold">Home</h1>
      <span className="text-7xl">🏡</span>
    </div>
  )
}
