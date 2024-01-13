'use client'
import { useEffect, useCallback, useState } from 'react'
import {
  getAllPosts,
  getAllPostsByCategory,
  getAllCategories,
} from '@/services/database'
import Cards from '../cards'
import Pagination from '../pagination'
import notFoundPosts from '../../../public/no-results-found.png'
import Image from 'next/image'
import SideBar from '../sidebar'

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

interface Category {
  id: string
  name: string
  slug: string
}

export default function BlogsList() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<Category[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectedCategory, setSelectedCategory] = useState('' as string)
  const [totalPages, setTotalPages] = useState<number>(0)
  const pageSize = 12

  const fetchBlogs = useCallback(async () => {
    setLoading(true)
    const blogs = await getAllPosts()
    setBlogs(blogs as Blog[])
    setTotalPages(Math.ceil(blogs.blogs.length / pageSize))
    setLoading(false)
  }, [])

  const fetchCategories = useCallback(async () => {
    const categories = await getAllCategories()
    setCategories(categories.categories as Category[])
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  const fetchBlogsByCategory = useCallback(async () => {
    setLoading(true)
    const blogs = await getAllPostsByCategory(selectedCategory)
    setBlogs(blogs as Blog[])
    setTotalPages(Math.ceil(blogs.blogs.length / pageSize))
    setLoading(false)
  }, [selectedCategory])

  useEffect(() => {
    selectedCategory ? fetchBlogsByCategory() : fetchBlogs()
  }, [fetchBlogs, fetchBlogsByCategory, selectedCategory])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
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
        {categories.map((category) => (
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
        ) : blogs.blogs.length > 0 ? (
          <Cards blogs={blogs.blogs} loading={loading} />
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
          <SideBar blogs={blogs.blogs} loading={loading} />
        </div>
      </div>
      <div>
        {blogs?.blogs?.length > 0 && (
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
