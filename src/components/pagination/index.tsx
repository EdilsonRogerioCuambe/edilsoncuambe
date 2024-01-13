import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

export default function Pagination({
  totalPages,
  currentPage,
  onChange,
}: {
  totalPages: number
  currentPage: number
  onChange: (page: number) => void
}) {
  return (
    <div className="flex justify-center items-center space-x-2">
      <button
        type="button"
        title="Página anterior"
        disabled={currentPage === 1}
        className={`${
          currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
        } p-2 rounded-lg bg-gray-200 text-gray-500 hover:bg-gray-300`}
        onClick={() => onChange(currentPage - 1)}
      >
        <FaChevronLeft />
      </button>

      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          type="button"
          className={`${
            currentPage === index + 1
              ? 'border-2 border-[#c4c4cc] bg-[#121214] text-[#c4c4cc]]'
              : 'border-2 border-[#c4c4cc] bg-[#121214] text-[#c4c4cc] hover:bg-[#c4c4cc] hover:text-[#121214]'
          } w-12 h-12 rounded-lg`}
          onClick={() => onChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        type="button"
        title="Próxima página"
        disabled={currentPage === totalPages}
        className={`${
          currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
        } p-2 rounded-lg bg-gray-200 text-gray-500 hover:bg-gray-300`}
        onClick={() => onChange(currentPage + 1)}
      >
        <FaChevronRight />
      </button>
    </div>
  )
}
