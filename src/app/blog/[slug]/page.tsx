'use client'
import { useParams } from 'next/navigation'
import { useState, useEffect, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'
import Banner from '@/components/banner'
import Image from 'next/image'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import SideBar from '@/components/sidebar'
import { CiRead } from 'react-icons/ci'
import { gql, request } from 'graphql-request'
import { NextSeo } from 'next-seo'
import { siteMetadata } from '@/utils/siteMetadata'

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

interface BlogResponse {
  blog: Blog
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

export default function Blog() {
  const { slug } = useParams()
  const [blog, setBlog] = useState<Blog>()
  const [blogs, setBlogs] = useState<Blog[]>()
  const [loading, setLoading] = useState(true)
  const [readingTimeText, setReadingTimeText] = useState('')

  const slugString = Array.isArray(slug) ? slug[0] : slug

  const DATABASE_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL

  if (!DATABASE_URL) {
    throw new Error(
      'Please define the DATABASE_URL environment variable inside .env.local',
    )
  }

  const fetchBlog = useCallback(async () => {
    setLoading(true)
    const queryBlogBySlug =
      gql`
    query BlogBySlug {
      blog(where: { slug: "` +
      slugString +
      `" }) {
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
    const blog = (await request(DATABASE_URL, queryBlogBySlug)) as BlogResponse
    setBlog(blog.blog)
    setLoading(false)
  }, [DATABASE_URL, slugString])

  useEffect(() => {
    fetchBlog()
  }, [fetchBlog])

  const fetchBlogs = useCallback(async () => {
    setLoading(true)
    const blogs = (await request(DATABASE_URL, queryAllBlogs)) as BlogsResponse
    setBlogs(blogs.blogs)
    setLoading(false)
  }, [DATABASE_URL])

  useEffect(() => {
    fetchBlogs()
  }, [fetchBlogs])

  const readingTime = (text: string) => {
    const wordsPerMinute = 200
    const words = text.split(/\s+/).length
    const readingTime = Math.ceil(words / wordsPerMinute)
    return readingTime
  }

  useEffect(() => {
    if (blog?.description) {
      const readingTimeText = `${readingTime(blog?.description)} min de leitura`
      setReadingTimeText(readingTimeText)
    }
  }, [blog?.description])

  if (!blog || loading || !blogs) {
    return (
      <main>
        <Banner title="Loading..." />
      </main>
    )
  }

  return (
    <>
      <NextSeo
        title={blog?.title}
        titleTemplate="%s | Blog"
        description={blog?.shortDescription}
        canonical={`https://edilsoncuambe.tech/blog/${blog?.slug}`}
        openGraph={{
          article: {
            publishedTime: blog?.publishedAt,
            modifiedTime: blog?.updatedAt,
            authors: [blog?.author?.name],
            tags: blog?.tags,
          },
          defaultImageHeight: 500,
          defaultImageWidth: 500,
          images: [
            {
              url: blog?.image?.url,
              width: 800,
              height: 600,
              alt: blog?.title,
            },
          ],
          locale: 'pt_BR',
          site_name: siteMetadata.title,
          description: blog?.shortDescription,
          title: blog?.title,
          url: `https://edilsoncuambe.tech/blog/${blog?.slug}`,
          type: 'article',
          siteName: siteMetadata.title,
        }}
        robotsProps={{
          nosnippet: true,
          notranslate: true,
          noimageindex: true,
          noarchive: true,
          maxSnippet: -1,
          maxImagePreview: 'none',
          maxVideoPreview: -1,
        }}
      />
      <Banner title={blog?.title} />
      <div className="max-w-7xl mx-auto my-5">
        {blog?.image && (
          <Image
            src={blog?.image?.url}
            alt={blog?.title}
            width={1600}
            height={700}
            className="rounded-lg w-full mx-auto"
          />
        )}
      </div>
      <div className="max-w-7xl mx-auto my-12 px-4 flex flex-col md:flex-row">
        <div className="lg:w-3/4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Image
                src={blog?.author?.avatar?.url}
                alt={blog?.author?.name}
                width={48}
                height={48}
                className="rounded-full w-16 h-16 object-cover"
              />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-[#c4c4cc]">
                {blog?.author?.name}
              </div>
              <div className="text-sm text-[#c4c4cc]">
                {new Date(blog?.publishedAt).toLocaleDateString()}
              </div>
              <div className="text-sm text-[#c4c4cc]">
                <CiRead className="inline-block mr-1" />
                {readingTimeText}
              </div>
            </div>
          </div>
          <article className="mt-6 prose w-full prose-xl dark:prose-invert text-slate-200 dark:text-[#c4c4cc] font-mono font-light prose-code:prose-lg prose-pre:bg-transparent prose-pre:p-0">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                code({ node, inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || '')

                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={dracula}
                      PreTag="div"
                      language={match[1]}
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                },
              }}
            >
              {blog?.description}
            </ReactMarkdown>
          </article>
        </div>
        <div className="lg:w-1/4">
          <SideBar blogs={blogs} loading={loading} />
        </div>
      </div>
    </>
  )
}
