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
  }
  image: {
    url: string
  }
}

const homepage = 'https://edilsoncuambe.tech/'

export default async function sitemap() {
  const DATABASE_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL

  if (!DATABASE_URL) {
    throw new Error(
      'Please define the DATABASE_URL environment variable inside .env.local',
    )
  }

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

  const { blogs } = await request<{ blogs: Blog[] }>(DATABASE_URL, query)

  const pages = [
    {
      url: homepage,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 0.7,
    },
    ...blogs.map((blog) => ({
      url: `${homepage}blog/${blog.slug}`,
      lastmod: new Date(blog.updatedAt).toISOString(),
      changefreq: 'daily',
      priority: 0.7,
    })),
  ]

  return `<?xml version="1.0" encoding="xml"?>
    <urlset
      xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="https://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="https://www.sitemaps.org/schemas/sitemap/0.9
      https://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
      ${pages
        .map(
          (page) => `
          <url>
            <loc>${page.url}</loc>
            <lastmod>${page.lastmod}</lastmod>
            <changefreq>${page.changefreq}</changefreq>
            <priority>${page.priority}</priority>
          </url>
        `,
        )
        .join('')}
    </urlset>
  `
}
