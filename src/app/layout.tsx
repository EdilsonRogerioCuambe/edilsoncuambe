import type { Metadata } from 'next'
import { Roboto_Mono as Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'
import ErrorComponent from '@/components/err'

const mono = Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Edilson Cuambe',
  description: 'Blog Sobre Tecnologia',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body className={`${mono.className} bg-[#202024] text-[#c4c4cc]`}>
        <ErrorBoundary errorComponent={ErrorComponent}>
          <Navbar />
          {children}
          <Footer />
          <ToastContainer />
        </ErrorBoundary>
      </body>
    </html>
  )
}
