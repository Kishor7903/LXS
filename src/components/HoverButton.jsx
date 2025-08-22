import { useState } from "react"


function HoverButton({ className, onClick, children, icon, iconActive, iconClassName='h-4', ...props}) {
    let [isHovered, setIsHovered] = useState(false);

  return (
    <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`lg:hover:bg-[rgb(8,43,61)] lg:hover:text-white border border-[rgb(8,43,61)] min-h-6 min-w-12 flex items-center gap-1 ${className}`} 
        onClick={onClick} {...props}
    >
        {children}
        <img 
            src={isHovered ? iconActive : icon}
            alt="" 
            className={`min-h-4 ${iconClassName}`}
        />
    </button>
  )
}

export default HoverButton
