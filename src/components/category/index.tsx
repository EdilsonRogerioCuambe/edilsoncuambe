'use client'

interface Category {
  id: string
  name: string
  publishedAt: string
  slug: string
  updatedAt: string
}

export default function Category({
  category,
  setSelectedCategory,
  selectedCategory,
}: {
  category: Category
  setSelectedCategory: (category: string) => void
  selectedCategory: string
}) {
  return (
    <button
      title="categoria"
      type="button"
      key={category.id}
      className={`${
        category.name === selectedCategory ? 'bg-orange-400' : 'bg-gray-800'
      } text-white px-4 py-2 mx-4 mt-4 rounded-md hover:bg-orange-400 hover:text-black transition-all duration-300 ease-in-out`}
      onClick={() => setSelectedCategory(category.name)}
    >
      {category.name}
    </button>
  )
}
