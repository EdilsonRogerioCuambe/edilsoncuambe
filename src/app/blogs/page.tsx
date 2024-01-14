import Banner from '@/components/banner'
import BlogsList from '@/components/blogs'
import type { Metadata } from 'next'

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
}

export default function Blogs() {
  return (
    <main>
      <Banner title="Blogs" />
      <div className="max-w-7xl mx-auto">
        <BlogsList />
      </div>
    </main>
  )
}
