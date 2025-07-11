import { Link } from "react-router-dom"


function ViewAllIcon({ navigate, className="text-sm" }) {
  return (
    <Link to={navigate} className={`self-end lg:pt-6 text-blue-500 font-semibold ${className}`}>
      <span className='active:underline lg:hover:underline'>View More</span>
      <i className="fi fi-br-angle-circle-right ml-1 relative top-[2px]"></i>
    </Link>
  )
}

export default ViewAllIcon
