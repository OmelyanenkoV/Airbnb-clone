import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from "@/app/components/navbar/Navbar";
import RegisterModal from "@/app/components/modals/RegisterModal";
import ToasterProvider from "@/app/providers/ToasterProvider";
import React from "react";
import LoginModal from "@/app/components/modals/LoginModal";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true} >
      <ToasterProvider/>
      <RegisterModal/>
      <LoginModal/>
      <Navbar/>
      {children}
      </body>
    </html>
  )
}
