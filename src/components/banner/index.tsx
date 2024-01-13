export default function Banner({ title }: { title: string }) {
  return (
    <div className="px-4 py-32 bg-[#323238] mx-auto">
      <div className="text-center justify-center items-center max-w-7xl mx-auto">
        <h1 className="text-5xl lg:text-7xl leading-snug font-bold">{title}</h1>
      </div>
    </div>
  )
}
