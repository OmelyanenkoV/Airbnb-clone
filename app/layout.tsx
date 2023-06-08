import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from "@/app/components/navbar/Navbar";
import RegisterModal from "@/app/components/modals/RegisterModal";
import ToasterProvider from "@/app/providers/ToasterProvider";
import React from "react";
import LoginModal from "@/app/components/modals/LoginModal";
import getCurrentUser from "@/app/actions/getCurrentUser";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true} >
      <ToasterProvider/>
      <RegisterModal/>
      <LoginModal/>
      <Navbar currentUser={currentUser}/>
      {children}
      </body>
    </html>
  )
}

// TODO: move currentUser to store

