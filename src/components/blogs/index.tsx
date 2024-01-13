'use client'
import { useEffect, useCallback, useState } from 'react'
import Cards from '../cards'
import Pagination from '../pagination'
import notFoundPosts from '../../../public/no-results-found.png'
import Image from 'next/image'
import SideBar from '../sidebar'
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

const queryAllCategories = gql`
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

export default function BlogsList() {
  const [blogs, setBlogs] = useState<Blog[]>()
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<Category[]>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectedCategory, setSelectedCategory] = useState('' as string)
  const [totalPages, setTotalPages] = useState<number>(0)
  const pageSize = 12

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
    setTotalPages(Math.ceil(blogs.blogs.length / pageSize))
    setLoading(false)
  }, [DATABASE_URL])

  console.log(blogs)

  const fetchCategories = useCallback(async () => {
    const categories = (await request(
      DATABASE_URL,
      queryAllCategories,
    )) as CategoriesResponse
    setCategories(categories.categories)
  }, [DATABASE_URL])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  const fetchBlogsByCategory = useCallback(async () => {
    setLoading(true)
    const query = gql`
    query BlogsByCategory {
      blogs(where: { category: { name: "${selectedCategory}" } }) {
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
    setBlogs(blogs.blogs)
    setTotalPages(Math.ceil(blogs.blogs.length / pageSize))
    setLoading(false)
  }, [DATABASE_URL, selectedCategory])

  useEffect(() => {
    selectedCategory ? fetchBlogsByCategory() : fetchBlogs()
  }, [fetchBlogs, fetchBlogsByCategory, selectedCategory])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  if (!blogs) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-pulse h-64 bg-[#121214] rounded-lg" />
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-pulse h-64 bg-[#121214] rounded-lg" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-4 my-4 p-4">
        {/** All button */}
        <button
          title="categoria"
          type="button"
          onClick={() => setSelectedCategory('')}
          className={`${
            selectedCategory === ''
              ? 'bg-purple-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-purple-300 hover:text-white'
          } px-4 py-2 rounded-lg transition duration-300 ease-in-out whitespace-nowrap`}
        >
          Todos
        </button>
        {categories?.map((category: Category) => (
          <button
            title="categoria"
            type="button"
            key={category.id}
            onClick={() => setSelectedCategory(category.name)}
            className={`${
              selectedCategory === category.name
                ? 'bg-purple-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-purple-300 hover:text-white'
            } px-4 py-2 rounded-lg transition duration-300 ease-in-out whitespace-nowrap`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="animate-pulse h-64 bg-[#121214] rounded-lg" />
          </div>
        ) : blogs?.length > 0 ? (
          <Cards blogs={blogs} loading={loading} />
        ) : (
          <div className="flex flex-col justify-center items-center my-10">
            <Image
              src={notFoundPosts}
              alt="Nenhum resultado encontrado"
              width={500}
              height={500}
            />
            <h2 className="text-2xl font-bold text-center">
              Nenhum resultado encontrado
            </h2>
          </div>
        )}
        <div className="mx-4">
          <SideBar blogs={blogs} loading={loading} />
        </div>
      </div>
      <div>
        {blogs?.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChange={handlePageChange}
          />
        )}
      </div>
    </div>
  )
}
