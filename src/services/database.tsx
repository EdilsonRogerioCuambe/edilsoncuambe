import { gql, request } from 'graphql-request'

const DATABASE_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL

if (!DATABASE_URL) {
  throw new Error(
    'Please define the DATABASE_URL environment variable inside .env.local',
  )
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
}

export const getAllPosts = async (): Promise<Blog[]> => {
  const query = gql`
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
  const blogs: Blog[] = await request(DATABASE_URL, query)
  return blogs
}

export const getAllPostsByCategory = async (
  category: string,
): Promise<Blog[]> => {
  const query =
    gql`
    query BlogsByCategory {
      blogs(where: { category: { name: "` +
    category +
    `" } }) {
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

  const blogs: Blog[] = await request(DATABASE_URL, query)
  return blogs
}

export const getPostBySlug = async (slug: string): Promise<Blog> => {
  const query =
    gql`
    query BlogBySlug {
      blog(where: { slug: "` +
    slug +
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

  const blog: Blog = await request(DATABASE_URL, query)
  return blog
}

interface Category {
  id: string
  name: string
  publishedAt: string
  slug: string
  updatedAt: string
}

export const getAllCategories = async (): Promise<Category[]> => {
  const query = gql`
    query Categories {
      categories {
        id
        name
        publishedAt
        slug
        updatedAt
      }
    }
  `
  const categories: Category[] = await request(DATABASE_URL, query)
  return categories
}

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

export const getAuthorByEmail = async (email: string): Promise<Author> => {
  const query =
    gql`
    query Author {
      author(where: { email: "` +
    email +
    `" }) {
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
  const author: Author = await request(DATABASE_URL, query)
  return author
}
