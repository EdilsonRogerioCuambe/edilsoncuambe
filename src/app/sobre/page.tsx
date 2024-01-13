'use client'
import Banner from '@/components/banner'
import ReactMarkdown from 'react-markdown'
import SideBar from '@/components/sidebar'
import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import github from '../../../public/github.png'
import linkedin from '../../../public/linkedin.png'
import request, { gql } from 'graphql-request'

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

const queryAllBlogs = gql`
    query Blogs {
      blogs() {
        createdAt
        description
        id
        publishedAt
        shortDescription
        slug
        title
        updatedAt
        tags
        image {
          url
        }
        author {
          ... on Author {
            id
            email
            name
            avatar {
              url
            }
          }
        }
        category {
          id
          name
        }
      }
    }
  `

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

export default function Sobre() {
  const [author, setAuthor] = useState<Author>()
  const [blogs, setBlogs] = useState<Blog[]>()
  const [loading, setLoading] = useState(true)

  const DATABASE_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL

  if (!DATABASE_URL) {
    throw new Error(
      'Please define the DATABASE_URL environment variable inside .env.local',
    )
  }

  const fetchBlogs = useCallback(async () => {
    setLoading(true)
    const blogs = (await request(DATABASE_URL, queryAllBlogs)) as BlogsResponse
    setBlogs(blogs.blogs)
    setLoading(false)
  }, [DATABASE_URL])

  const fetchAuthor = useCallback(async () => {
    setLoading(true)
    const author = (await request(
      DATABASE_URL,
      queryAuthorByEmail,
    )) as AuthorResponse
    setAuthor(author.author)
    setLoading(false)
  }, [DATABASE_URL])

  useEffect(() => {
    fetchBlogs()
    fetchAuthor()
  }, [fetchBlogs, fetchAuthor])

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
          <SideBar blogs={blogs} loading={loading} />
        </div>
      </div>
    </main>
  )
}
