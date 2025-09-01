import { Link } from "react-router-dom"


function ViewAllIcon({ navigate, className }) {
  return (
    <Link to={navigate} className={`self-end text-[rgb(59,130,246)] font-semibold ${className}`}>
      <span className='active:underline'>View More</span>
      <i className="fi fi-br-angle-circle-right ml-1 relative top-[2px]"></i>
    </Link>
  )
}

export default ViewAllIcon
