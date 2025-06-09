

function RgbButton({className="text-sm px-3 py-1 font-semibold", onClick, children}) {
  return (
    <button className={`bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white ${className}`} onClick={onClick}>{children}</button>
  )
}

export default RgbButton
