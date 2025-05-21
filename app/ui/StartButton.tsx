"use client"

import { useRouter } from "next/navigation"

export default function StartButton() {
  const router = useRouter()

  function handleStart() {
    router.push("/form")
  }

  return (
    <div className="flex min-h-screen bg-gray-200 items-center justify-center">
      <button
        className="px-12 py-6 text-3xl font-bold text-white bg-green-600 backdrop-blur-md rounded-lg shadow-lg hover:bg-green-300 transition duration-300"
        onClick={handleStart}
      >
        Começar
      </button>
    </div>
  )
}
