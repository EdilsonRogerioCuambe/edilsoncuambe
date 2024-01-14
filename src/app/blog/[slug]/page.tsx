import { gql, request } from 'graphql-request'
import BlogPage from '@/components/blog-page'
import type { Metadata, ResolvingMetadata } from 'next'

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

export const dynamicParams = false

async function fetchAllBlogs() {
  try {
    const DATABASE_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL

    if (!DATABASE_URL) {
      throw new Error(
        'Please define the DATABASE_URL environment variable inside .env.local',
      )
    }

    const queryAllBlogs = gql`
      query Blogs {
        blogs(orderBy: createdAt_DESC) {
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
    const blogs = (await request(DATABASE_URL, queryAllBlogs)) as BlogsResponse
    return blogs.blogs
  } catch (error) {
    console.log(error)
  }
}

async function fetchBlog(slug: string) {
  try {
    const DATABASE_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL

    if (!DATABASE_URL) {
      throw new Error(
        'Please define the DATABASE_URL environment variable inside .env.local',
      )
    }

    const queryBlog = gql`
      query Blog($slug: String!) {
        blog(where: { slug: $slug }) {
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
    const blog = (await request(DATABASE_URL, queryBlog, {
      slug,
    })) as BlogResponse
    return blog.blog
  } catch (error) {
    console.log(error)
  }
}

export async function generateMetadata(
  params: { params: { slug: string } },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const blog = await fetchBlog(params.params.slug)

  if (!blog) {
    return {}
  }

  return {
    metadataBase: new URL('https://edilsoncuambe.tech'),
    title: {
      template: '%s | Tecnologia em Foco com Edilson Cuambe',
      default: blog.title,
    },
    description: blog.shortDescription,
    creator: blog.author.name,
    publisher: blog.author.name,
    category: blog.category.name,
    keywords: blog.tags,
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      url: `https://edilsoncuambe.tech/blog/${blog.slug}`,
      images: blog.image.url,
      siteName: 'Edilson Rogério Cuambe',
      title: blog.title,
      description: blog.shortDescription,
    },
    robots: {
      index: false,
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
}

export default async function Blog(params: { params: { slug: string } }) {
  const blogs = await fetchAllBlogs()
  const blog = await fetchBlog(params.params.slug)

  if (!blog || !blogs) {
    return null
  }

  return <>{blog && <BlogPage blog={blog} blogs={blogs} />}</>
}
