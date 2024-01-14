import Image from 'next/image'
import Link from 'next/link'

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

export default function Cards({ blogs }: { blogs: Blog[] }) {
  const loadingCards = Array.from({ length: 12 }).map((_, index) => (
    <div
      key={index}
      className="p-5 shadow-lg cursor-pointer rounded-lg hover:shadow-2xl transition-all duration-300 ease-in-out"
    >
      <div className="animate-pulse h-64 bg-[#121214] rounded-lg" />
      <div className="space-y-4 mt-4">
        <div className="h-8 bg-[#121214] rounded-md" />
        <div className="flex space-x-2 items-center">
          <div className="h-8 w-8 bg-[#121214] rounded-full" />{' '}
          <div className="h-8 bg-[#121214] w-full rounded-md" />
        </div>
        <div className="h-8 bg-[#121214] w-3/4 rounded-md" />{' '}
      </div>
    </div>
  ))

  if (!blogs) {
    return (
      <div className="grid md:grid-cols-3 mb-5 sm:grid-cols-2 grid-cols-1 gap-8">
        {loadingCards}
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-3 mb-5 sm:grid-cols-2 grid-cols-1 gap-8">
      {blogs?.map((blog) => (
        <Link
          key={blog?.id}
          href={`/blog/${blog?.slug}`}
          passHref
          className="p-5 shadow-lg rounded-lg hover:shadow-2xl transition-all duration-300 ease-in-out h-[550px]"
        >
          <Image
            src={blog?.image?.url}
            alt={blog?.author?.name}
            className="rounded-lg w-full h-64 object-cover"
            width={500}
            height={500}
          />
          <h3 className="mt-4 mb-2 font-bold text-xl hover:text-purple-400 transition-all duration-300 ease-in-out">
            {blog.title}
          </h3>
          <p className="mb-2 text-gray-400">
            <Image
              src={blog?.author?.avatar?.url}
              alt={blog?.author?.name}
              className="rounded-full w-10 h-10 object-cover inline-flex mr-2 border-2 border-purple-400"
              width={24}
              height={24}
            />
            {blog?.author?.name}
          </p>
          <p className="text-sm text-gray-400">
            Publicado em: {new Date(blog?.publishedAt).toLocaleDateString()}
          </p>
        </Link>
      ))}
    </div>
  )
}
