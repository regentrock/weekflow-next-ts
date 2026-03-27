"use client"

import { useState } from "react"
import dynamic from "next/dynamic"

const Header = dynamic(() => import("@/components/Header/Header"), { ssr: false })
const Board = dynamic(() => import("@/components/Board/Board"), { ssr: false })
const Footer = dynamic(() => import("@/components/Footer/Footer"), { ssr: false })

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <main>
      <Header onAddTaskClick={() => setIsFormOpen(true)} />

      <Board
        isFormOpen={isFormOpen}
        closeForm={() => setIsFormOpen(false)}
        onOpenForm={() => setIsFormOpen(true)}
      />

      <Footer />
    </main>
  )
}