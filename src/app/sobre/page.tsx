import Banner from '@/components/banner'
import ReactMarkdown from 'react-markdown'
import SideBar from '@/components/sidebar'
import Image from 'next/image'
import github from '../../../public/github.png'
import linkedin from '../../../public/linkedin.png'
import request, { gql } from 'graphql-request'
import type { Metadata } from 'next'

interface Author {
  avatar: {
    url: string
  }
  email: string
  github: string
  id: string
  linkedIn: string
  name: string
  phone: string
  publishedAt: string
  updatedAt: string
  createdAt: string
  description: string
}

interface AuthorResponse {
  author: Author
}

interface Blog {
  createdAt: string
  description: string
  id: string
  publishedAt: string
  shortDescription: string
  slug: string
  title: string
  updatedAt: string
  tags: string[]
  author: {
    id: string
    email: string
    name: string
    avatar: {
      url: string
    }
  }
  category: {
    id: string
    name: string
  }
  image: {
    url: string
  }
}

interface BlogsResponse {
  blogs: Blog[]
}

async function fetchAllBlogs() {
  const DATABASE_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL

  if (!DATABASE_URL) {
    throw new Error(
      'Please define the DATABASE_URL environment variable inside .env.local',
    )
  }

  const query = gql`
    query AllBlogs {
      blogs(orderBy: createdAt_DESC) {
        author {
          ... on Author {
            id
            email
            name
            publishedAt
            phone
            updatedAt
            github
            createdAt
            avatar {
              url
            }
          }
        }
        category {
          name
          id
        }
        description
        id
        publishedAt
        image {
          url
        }
        title
        updatedAt
        tags
        slug
        shortDescription
      }
    }
  `
  const blogs = (await request(DATABASE_URL, query)) as BlogsResponse
  return blogs.blogs
}

async function fetchAuthor() {
  const DATABASE_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL

  if (!DATABASE_URL) {
    throw new Error(
      'Please define the DATABASE_URL environment variable inside .env.local',
    )
  }
  const queryAuthorByEmail = gql`
    query Author {
      author(where: { email: "edilson@aluno.unilab.edu.br" }) {
        avatar {
          url
        }
        email
        github
        id
        linkedIn
        name
        phone
        publishedAt
        updatedAt
        createdAt
        description
      }
    }
  `

  const author = (await request(
    DATABASE_URL,
    queryAuthorByEmail,
  )) as AuthorResponse

  return author.author
}

export const metadata: Metadata = {
  metadataBase: new URL('https://edilsoncuambe.tech'),
  title: 'Sobre Mim | Tecnologia em Foco com Edilson Cuambe',
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

export default async function Sobre() {
  const author = await fetchAuthor()
  const blogs = await fetchAllBlogs()

  if (!author) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-pulse h-64 bg-[#121214] rounded-lg" />
      </div>
    )
  }

  if (!blogs) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-pulse h-64 bg-[#121214] rounded-lg" />
      </div>
    )
  }

  return (
    <main>
      <Banner title="Sobre Mim" />
      <div className="max-w-7xl mx-auto my-12 px-4 flex flex-col md:flex-row">
        <div className="lg:w-3/4">
          <div className="prose w-full prose-xl dark:prose-invert text-slate-200 dark:text-[#c4c4cc] font-mono font-light prose-code:prose-lg prose-pre:bg-transparent prose-pre:p-0">
            <ReactMarkdown>{author?.description}</ReactMarkdown>
          </div>
          <div className="flex flex-col md:flex-row mt-4">
            <div className="md:w-1/3">
              {author?.avatar && (
                <Image
                  src={author?.avatar.url}
                  alt={author?.name}
                  width={200}
                  height={200}
                  className="rounded"
                />
              )}
            </div>
            <div className="md:w-2/3 md:ml-4">
              <div className="flex flex-col">
                <div className="flex flex-row items-center">
                  <h2 className="text-2xl font-bold">{author?.name}</h2>
                  <a
                    title="GitHub"
                    href={author?.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2"
                  >
                    <Image src={github} alt="GitHub" width={24} height={24} />
                  </a>
                  <a
                    title="LinkedIn"
                    href={author?.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2"
                  >
                    <Image
                      src={linkedin}
                      alt="LinkedIn"
                      width={24}
                      height={24}
                    />
                  </a>
                </div>
                <p className="text-gray-400">{author?.email}</p>
                <p className="text-gray-400">{author?.phone}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-1/4">
          <SideBar blogs={blogs} />
        </div>
      </div>
    </main>
  )
}
