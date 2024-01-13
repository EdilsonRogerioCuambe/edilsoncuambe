import Banner from '@/components/banner'
import BlogsList from '@/components/blogs'

export default function Home() {
  return (
    <main className="">
      <Banner title="Seja Bem Vindo Ao Meu Blog" />
      <div className="mx-auto max-w-7xl">
        <BlogsList />
      </div>
    </main>
  )
}
