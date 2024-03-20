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
    <div className="grid md:grid-cols-3 my-5 sm:grid-cols-2 grid-cols-1 gap-8">
      {blogs?.map((blog) => (
        <Link key={blog?.id} href={`/blog/${blog?.slug}`} passHref>
          <div className="flex flex-col h-full md:px-0 px-4">
            <Image
              src={blog?.image?.url}
              alt={blog?.title}
              className="rounded-lg w-full object-cover"
              width={500}
              height={300}
              layout="responsive"
            />
            <div className="rounded-lg hover:shadow-2xl transition-all duration-300 ease-in-out flex-grow cursor-pointer">
              <h3 className="mt-4 mb-2 font-bold text-xl hover:text-purple-400 transition-all duration-300 ease-in-out truncate">
                {blog.title}
              </h3>
              <p className="text-gray-400 mb-4">
                {blog.shortDescription.slice(0, 75)}...
              </p>
              <div className="flex items-center mb-2">
                <Image
                  src={blog?.author?.avatar?.url}
                  alt={blog?.author?.name}
                  className="rounded-full object-cover inline-flex mr-2 border-2 border-purple-400"
                  width={40}
                  height={40}
                  layout="fixed"
                />
                <div className="flex flex-col">
                  <span className="text-gray-400">{blog?.author?.name}</span>
                  <span className="text-gray-400">
                    {new Date(blog?.publishedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {blog?.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-purple-400 text-white px-2 py-1 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
