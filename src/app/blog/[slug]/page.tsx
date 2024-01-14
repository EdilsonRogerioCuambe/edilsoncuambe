import { gql, request } from 'graphql-request'
import BlogPage from '@/components/blog-page'

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

export async function generateStaticParams() {
  const blogs = await fetchAllBlogs()

  if (!blogs) {
    return null
  }

  return blogs.map((blog) => {
    return {
      params: {
        slug: blog.slug,
      },
    }
  })
}

export default async function Blog(params: { params: { slug: string } }) {
  const blogs = await fetchAllBlogs()
  const blog = await fetchBlog(params.params.slug)

  if (!blog || !blogs) {
    return null
  }

  return <>{blog && <BlogPage blog={blog} blogs={blogs} />}</>
}
