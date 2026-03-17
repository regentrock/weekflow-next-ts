"use client"

import { useState } from "react"

import Header from "@/components/Header/Header"
import Board from "@/components/Board/Board"
import Footer from "@/components/Footer/Footer"

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <main>
      <Header onAddTaskClick={() => setIsFormOpen(true)} />
      <Board
        isFormOpen={isFormOpen}
        closeForm={() => setIsFormOpen(false)}
        onOpenForm={() => setIsFormOpen(true)} // nova prop para abrir o form
      />
      <Footer />
    </main>
  )
}