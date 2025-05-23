

function HeadingTextWithUnderline({name, className}) {
  return (
    <h3 className={`bg-gradient-to-b from-[rgb(248,181,42)] to-[rgb(240,84,120)] flex items-center rounded-r-full text-3xl font-semibold pl-5 md:pl-8 lg:pl-12 xl:pl-16 py-1 text-white shadow-[0_5px_10px_-2px_rgb(8,43,61,0.6)] ${className}`}>{name}</h3>
  )
}

export default HeadingTextWithUnderline
