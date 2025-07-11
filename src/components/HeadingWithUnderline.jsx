

function HeadingWithUnderline({className, name, textClassName}) {
  return (
    <div className={`self-center relative ${className}`}>
      <span className={`text-3xl w-full font-bold after:absolute after:bottom-0 after:left-7 after:mx-auto after:bg-[rgb(8,43,61)] after:h-1 after:w-3/4 after:rounded uppercase ${textClassName}`}>{name}</span>
    </div>
  )
}

export default HeadingWithUnderline
