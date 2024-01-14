import type { Metadata } from 'next'
import { Roboto_Mono as Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import GoogleAnalytics from './GoogleAnalytics'

const mono = Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://edilsoncuambe.tech'),
  title: {
    template: '%s | Tecnologia em Foco com Edilson Cuambe',
    default: 'Tecnologia em Foco com Edilson Cuambe',
  },
  description:
    'Descubra as maravilhas do mundo da tecnologia com Edilson Rogério Cuambe, um entusiasta da engenharia de computação e desenvolvedor full stack. Acompanhe sua jornada enquanto ele desvenda as mais recentes inovações e tendências tecnológicas.',
  creator: 'Edilson Rogério Cuambe',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://edilsoncuambe.tech',
    images: [
      {
        url: '../../public/me.jpg',
        width: 1200,
        height: 630,
        alt: 'Edilson Rogério Cuambe',
      },
    ],
    siteName: 'Edilson Rogério Cuambe',
    title: 'Tecnologia em Foco com Edilson Cuambe',
    description:
      'Descubra as maravilhas do mundo da tecnologia com Edilson Rogério Cuambe, um entusiasta da engenharia de computação e desenvolvedor full stack. Acompanhe sua jornada enquanto ele desvenda as mais recentes inovações e tendências tecnológicas.',
  },
  category: 'Tecnologia',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'TPHgOpVGbPqyxuS6G-HjC--agGlrtzt-Edgor30bO3M',
    other: {
      'msvalidate.01': 'D394D5F78D4CC456BC6BE2175B9BC1C9',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const GOOGLE_ANALYTICS = process.env.GA_TRACKING_ID

  if (!GOOGLE_ANALYTICS) {
    throw new Error('Missing env.GA_TRACKING_ID')
  }

  return (
    <html lang="pt">
      <body className={`${mono.className} bg-[#202024] text-[#c4c4cc]`}>
        <Navbar />
        {children}
        <Footer />
        <ToastContainer />
        <GoogleAnalytics GA_TRACKING_ID={GOOGLE_ANALYTICS} />
      </body>
    </html>
  )
}
