import type { Metadata } from 'next'
import { Roboto_Mono as Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const mono = Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Blog | Edilson Rogério Cuambe',
  description: 'Blog Sobre Tecnologia e Programação.',
  creator: 'Edilson Rogério Cuambe',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body className={`${mono.className} bg-[#202024] text-[#c4c4cc]`}>
        <Navbar />
        {children}
        <Footer />
        <ToastContainer />
      </body>
    </html>
  )
}
