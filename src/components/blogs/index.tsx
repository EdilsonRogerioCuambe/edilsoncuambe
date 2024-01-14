import { gql, request } from 'graphql-request'
import Category from '../category'
import Categories from '../categories'

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

interface Category {
  id: string
  name: string
  publishedAt: string
  slug: string
  updatedAt: string
}

interface CategoriesResponse {
  categories: Category[]
}

export const dynamicParams = true

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

async function fetchAllCategories() {
  const DATABASE_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL

  if (!DATABASE_URL) {
    throw new Error(
      'Please define the DATABASE_URL environment variable inside .env.local',
    )
  }

  const query = gql`
    query AllCategories {
      categories {
        id
        name
        publishedAt
        slug
        updatedAt
      }
    }
  `
  const categories = (await request(DATABASE_URL, query)) as CategoriesResponse
  return categories.categories
}

export default async function BlogsList() {
  const blogs = await fetchAllBlogs()
  const categories = await fetchAllCategories()

  return <Categories categories={categories} blogs={blogs} />
}
