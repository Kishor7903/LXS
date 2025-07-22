

function RgbButton({className="text-sm px-3 py-1 font-semibold", onClick, children}) {
  return (
    <button className={`bg-gradient-to-r from-[rgb(248,181,44)] to-[rgb(240,85,120)] rounded-full text-white lg:hover:shadow-[0px_0px_5px_-1px_rgb(8,43,61)] ${className}`} onClick={onClick}>{children}</button>
  )
}

export default RgbButton
