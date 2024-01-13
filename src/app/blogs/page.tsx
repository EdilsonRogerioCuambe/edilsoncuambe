import Banner from '@/components/banner'
import BlogsList from '@/components/blogs'

export default function Blogs() {
  return (
    <main>
      <Banner title="Blogs" />
      <div className="max-w-7xl mx-auto">
        <BlogsList />
      </div>
    </main>
  )
}
