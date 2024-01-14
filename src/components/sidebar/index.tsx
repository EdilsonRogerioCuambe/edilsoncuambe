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

export default function SideBar({ blogs }: { blogs: Blog[] }) {
  if (!blogs) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-pulse h-64 bg-[#121214] rounded-lg" />
      </div>
    )
  }

  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold">Últimos Posts</h3>
      <div>
        {blogs?.slice(0, 5)?.map((blog) => (
          <div
            key={blog.id}
            className="my-5 border-b-2 border-[#c4c4cc] border-spacing-2"
          >
            <Link
              href={`/blog/${blog.slug}`}
              className="font-medium mb-2 hover:text-orange-400 inline-flex items-center py-1 transition-all duration-300 ease-in-out"
            >
              {blog.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
