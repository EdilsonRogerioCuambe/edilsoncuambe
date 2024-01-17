import Cards from '@/components/cards'
import { gql, request } from 'graphql-request'

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
    slug: string
  }
  image: {
    url: string
  }
}

interface BlogsResponse {
  blogs: Blog[]
}

async function getBlogsByCateroy(category: string) {
  const DATABASE_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL

  if (!DATABASE_URL) {
    throw new Error(
      'Please define the DATABASE_URL environment variable inside .env.local',
    )
  }

  const query = gql`
    query BlogsByCategory {
      blogs(where: { category: { slug: "${category}" } }) {
        createdAt
        description
        id
        publishedAt
        shortDescription
        slug
        title
        updatedAt
        tags
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
          slug
        }
        image {
          url
        }
      }
    }
  `

  const { blogs }: BlogsResponse = await request(DATABASE_URL, query)

  return blogs
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params

  const blogs = await getBlogsByCateroy(slug)

  console.log(blogs)

  return (
    <main>
      <div className="max-w-7xl mx-auto py-24">
        <Cards blogs={blogs} />
      </div>
    </main>
  )
}
