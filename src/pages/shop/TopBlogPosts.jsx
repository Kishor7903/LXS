import HeadingText from '@/components/HeadingText'
import ViewAllIcon from '@/components/ViewAllIcon'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function TopBlogPosts() {
    let navigate = useNavigate();
    
    let item = [
        {
            name: "Welcome to LXS Store",
            date: "February 10, 2025",
            slug: "/blog"
        },
        {
            name: "The Future of Fashion",
            date: "February 10, 2025",
            slug: "#"
        },
        {
            name: "Bringing AR & VR",
            date: "February 10, 2025",
            slug: "#"
        },
        {
            name: "Meet The Creators",
            date: "February 10, 2025",
            slug: "#"
        },
        {
            name: "Building a Multiverse",
            date: "February 10, 2025",
            slug: "#"
        },
    ]
  return (
    <div className='border-t mt-5 py-3 lg:py-5'>
        <HeadingText name="Top Blog Post" />
        <div className="w-full px-6 lg:px-16 flex flex-col">
            <ViewAllIcon navigate="/all-blogs" className="hidden md:flex" />
            <div className="flex justify-center flex-wrap lg:flex-nowrap gap-6 mt-2 w-full py-3 lg:py-1">
                {
                    item.map((items,index) => (
                        <div key={index} className="h-40 lg:h-96 w-[45%] lg:w-1/5 text-center">
                            <div onClick={() => navigate(items.slug)} className="border border-[rgb(8,43,61)] rounded-[30px] h-[80%]"></div>
                            <h4 className='text-sm lg:text-xl font-bold mt-2'>{items.name}</h4>
                            <p className='relative bottom-1 text-[11px] lg:text-sm'>{items.date}</p>
                        </div>
                    ))
                }
            </div>
            <ViewAllIcon navigate="#" className="flex md:hidden" />
        </div>
    </div>
  )
}

export default TopBlogPosts
