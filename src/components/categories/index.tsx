'use client'
import { useState } from 'react'
import Image from 'next/image'

import Category from '../category'
import SideBar from '../sidebar'
import Cards from '../cards'

import notFoundPosts from '../../../public/no-results-found.png'
import Pagination from '../pagination'

interface Category {
  id: string
  name: string
  publishedAt: string
  slug: string
  updatedAt: string
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
  image: {
    url: string
  }
}

export default function Categories({
  categories,
  blogs,
}: {
  categories: Category[]
  blogs: Blog[]
}) {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  const filteredBlogs = blogs.filter(
    (blog) => !selectedCategory || blog.category.name === selectedCategory,
  )

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage)

  const currentBlogs = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  return (
    <div>
      <div className="flex flex-wrap justify-center items-center">
        <button
          title="categoria"
          type="button"
          key="all"
          className={`${
            !selectedCategory ? 'bg-orange-400' : 'bg-gray-800'
          } text-white px-4 py-2 mx-4 mt-4 rounded-md hover:bg-orange-400 hover:text-black transition-all duration-300 ease-in-out`}
          onClick={() => setSelectedCategory('')}
        >
          Todos
        </button>
        {categories?.map((category: Category) => (
          <Category
            key={category.id}
            category={category}
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
        ))}
      </div>
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex flex-col gap-12">
          {blogs.length > 0 || currentBlogs.length > 0 ? (
            <Cards blogs={currentBlogs} />
          ) : (
            <div className="flex flex-col justify-center items-center">
              <Image
                src={notFoundPosts}
                alt="No results found"
                width={300}
                height={300}
              />
              <p className="text-2xl font-bold text-gray-800">
                No results found
              </p>
            </div>
          )}
        </div>
        <div className="mx-4 mt-4">
          <SideBar blogs={blogs} />
        </div>
      </div>
      <div>
        <Pagination
          currentPage={currentPage}
          onChange={(page) => setCurrentPage(page)}
          totalPages={totalPages}
          key={currentPage}
        />
      </div>
    </div>
  )
}
