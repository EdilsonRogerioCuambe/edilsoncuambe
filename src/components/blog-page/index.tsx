'use client'
import Image from 'next/image'
import SideBar from '../sidebar'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import ReactMarkdown from 'react-markdown'
import { CiRead } from 'react-icons/ci'
import Banner from '../banner'

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

export default function BlogPage({
  blog,
  blogs,
}: {
  blog: Blog
  blogs: Blog[]
}) {
  const readingTime = (text: string) => {
    const wordsPerMinute = 200
    const words = text.split(/\s+/).length
    const readingTime = Math.ceil(words / wordsPerMinute)
    return readingTime
  }

  const readingTimeText = `${readingTime(blog?.description)} min de leitura`

  return (
    <div>
      <Banner title={blog?.title} />
      <div className="max-w-7xl mx-auto my-5">
        {blog?.image && (
          <Image
            src={blog?.image?.url}
            alt={blog?.title}
            width={1600}
            height={700}
            className="rounded-lg w-full mx-auto"
          />
        )}
      </div>
      <div className="max-w-7xl mx-auto my-12 px-4 flex flex-col md:flex-row">
        <div className="lg:w-3/4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Image
                src={blog?.author?.avatar?.url}
                alt={blog?.author?.name}
                width={48}
                height={48}
                className="rounded-full w-16 h-16 object-cover"
              />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-[#c4c4cc]">
                {blog?.author?.name}
              </div>
              <div className="text-sm text-[#c4c4cc]">
                {new Date(blog?.publishedAt).toLocaleDateString()}
              </div>
              <div className="text-sm text-[#c4c4cc]">
                <CiRead className="inline-block mr-1" />
                {readingTimeText}
              </div>
            </div>
          </div>
          <article className="mt-6 prose w-full prose-xl prose-invert text-[#c4c4cc] font-mono font-light prose-code:prose-lg prose-pre:bg-transparent prose-pre:p-0">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                code({ node, inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || '')

                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={dracula}
                      PreTag="div"
                      language={match[1]}
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                },
              }}
            >
              {blog?.description}
            </ReactMarkdown>
          </article>
        </div>
        <div className="lg:w-1/4">
          <h2 className="text-2xl font-bold text-[#c4c4cc] mb-4">Tags</h2>
          <div className="flex flex-wrap justify-center mb-4">
            {blog?.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-[#c4c4cc] text-[#1f1f1f] mr-2 mb-2"
              >
                {tag}
              </span>
            ))}
          </div>
          <SideBar blogs={blogs} />
        </div>
      </div>
    </div>
  )
}
