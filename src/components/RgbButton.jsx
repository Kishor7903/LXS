

function RgbButton({className="text-sm px-3 py-1 font-semibold", onClick, children}) {
  return (
    <button className={`bg-gradient-to-r from-[rgb(248,181,44)] to-[rgb(253,84,120)] rounded-full text-white lg:hover:scale-[1.08] lg:active:scale-[1] duration-200 ${className}`} onClick={onClick}>{children}</button>
  )
}

export default RgbButton
