import { Link } from "react-router-dom"


function ViewAllIcon({navigate, className}) {
  return (
    <div className={`justify-end items-center text-[11px] md:text-[13px] lg:text-[15px] lg:pt-2 ${className}`}>
      <Link to={navigate} className='active:underline lg:hover:underline font-medium text-[rgb(44,115,182)]'>View All</Link>
      <i className="fi fi-br-arrow-circle-right ml-1 relative top-[1px] text-[rgb(44,115,182)] text-sm"></i>
    </div>
  )
}

export default ViewAllIcon
