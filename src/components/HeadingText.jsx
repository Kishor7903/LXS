

function HeadingText({name, className = "text-xl md:text-3xl "}) {
  return (
    <h2 className={`font-bold text-center uppercase ${className}`}>{name}</h2>
  )
}

export default HeadingText
