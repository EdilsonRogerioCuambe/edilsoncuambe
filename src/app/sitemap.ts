import request, { gql } from 'graphql-request'
import { MetadataRoute } from 'next'

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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await fetchAllBlogs()

  if (!blogs) {
    return []
  }

  return blogs.slice(0, 50000).map((blog) => ({
    url: `https://edilsoncuambe.tech/blog/${blog.slug}`,
    lastModified: new Date(blog.updatedAt),
  }))
}
