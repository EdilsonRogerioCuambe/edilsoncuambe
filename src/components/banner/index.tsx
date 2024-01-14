export default function Banner({ title }: { title: string }) {
  return (
    <div className="px-4 md:px-8 py-20 md:py-32 bg-[#323238] mx-auto">
      <div className="text-center justify-center items-center max-w-4xl md:max-w-6xl lg:max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl leading-snug font-bold">
          {title}
        </h1>
      </div>
    </div>
  )
}
