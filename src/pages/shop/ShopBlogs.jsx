import ViewAllIcon from "@/components/ViewAllIcon";
import { useState } from "react"


function ShopBlogs() {
    const [show, setShow] = useState(true);

    const blogs = [
        {
            "title": "Top 10 Must Have Summer Outfits From LXS Store",
            "date": "10.06.2024",
            "image": "./vite.svg",
            "content": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid autem ab iste rem nam cupiditate accusamus natus tenetur debitis molestias sunt optio atque perspiciatis blanditiis ullam at assumenda, excepturi sit incidunt earum modi ducimus. Magni assumenda quo doloremque vitae adipisci?"
        },
        {
            "title": "How To Style Your Wardrobe With LXS Store's Latest Colletion",
            "date": "11.06.2024",
            "image": "./vite.svg",
            "content": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid autem ab iste rem nam cupiditate accusamus natus tenetur debitis molestias sunt optio atque perspiciatis blanditiis ullam at assumenda, excepturi sit incidunt earum modi ducimus. Magni assumenda quo doloremque vitae adipisci?"
        },
        {
            "title": "Exclusive Interview With LXS Store's Creative Director",
            "date": "12.06.2024",
            "image": "./vite.svg",
            "content": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid autem ab iste rem nam cupiditate accusamus natus tenetur debitis molestias sunt optio atque perspiciatis blanditiis ullam at assumenda, excepturi sit incidunt earum modi ducimus. Magni assumenda quo doloremque vitae adipisci?"
        },
        {
            "title": "Eco-Friendly Fashion: How LXS Store is Leading The Way",
            "date": "13.06.2024",
            "image": "./vite.svg",
            "content": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid autem ab iste rem nam cupiditate accusamus natus tenetur debitis molestias sunt optio atque perspiciatis blanditiis ullam at assumenda, excepturi sit incidunt earum modi ducimus. Magni assumenda quo doloremque vitae adipisci?"
        },
        {
            "title": "Eco-Friendly Fashion: How LXS Store is Leading The Way",
            "date": "13.06.2024",
            "image": "./vite.svg",
            "content": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid autem ab iste rem nam cupiditate accusamus natus tenetur debitis molestias sunt optio atque perspiciatis blanditiis ullam at assumenda, excepturi sit incidunt earum modi ducimus. Magni assumenda quo doloremque vitae adipisci?"
        },
    ];

    return (
        <div className="py-5 lg:py-10 space-y-2 lg:space-y-5 ">

            <div className="flex flex-col xl:flex-row gap-3 xl:items-center">
                <h3 className={`bg-gradient-to-r from-[rgb(248,181,42)] to-[rgb(240,84,120)] flex items-center rounded-r-full text-lg xl:text-3xl font-semibold pl-5 md:pl-8 lg:pl-12 xl:pl-16 py-1 text-white shadow-[0_5px_5px_-2px_rgb(8,43,61,0.6)] w-[195px] xl:w-[380px]`}>Intergalactic Intel!</h3>
                <p className="text-xs xl:text-lg font-medium ml-1 relative bottom-2 xl:bottom-0">The most classified and stylish reports from deep space! 📜</p>
            </div>

            {/* <div className="flex gap-3 items-center">
                <h3 className={`bg-gradient-to-b from-[rgb(248,181,42)] to-[rgb(240,84,120)] flex items-center rounded-r-full text-3xl font-semibold pl-5 md:pl-8 lg:pl-12 xl:pl-16 py-1 text-white shadow-[0_5px_10px_-2px_rgb(8,43,61,0.6)] w-[345px]`}>Intergalactic Intel!</h3>
                <p className="text-lg font-medium pr-14">The most classified and stylish reports from deep space! 📜</p>
            </div> */}

            <div className="flex justify-center md:justify-between items-center px-5 md:px-8 lg:px-12 xl:px-16">
                <div className="gap-3 md:gap-5 lg:gap-4 flex">
                    <h4 className={`h-7 xl:h-8 px-3 border border-[rgb(8,43,61)] flex justify-center items-center rounded-full lg:hover:bg-[rgb(8,43,61)] font-medium text-sm xl:text-base lg:hover:text-white cursor-pointer ${show ? "bg-[rgb(8,43,61)] text-white" : ""}`} onClick={() => setShow(true)}>Latest</h4>
                    <h4 className={`h-7 xl:h-8 px-3 border border-[rgb(8,43,61)] flex justify-center items-center rounded-full lg:hover:bg-[rgb(8,43,61)] font-medium text-xs xl:text-base lg:hover:text-white cursor-pointer ${!show ? "bg-[rgb(8,43,61)] text-white" : ""}`} onClick={() => setShow(false)}>Popular</h4>
                </div>
                <ViewAllIcon navigate="/blog" className="hidden md:flex" />
            </div>

            <div className="h-auto w-full grid grid-cols-2 md:grid-cols-5 gap-x-3 gap-y-4 md:gap-x-4 md:gap-y-5 lg:gap-x-6 lg:gap-y-6 px-5 md:px-8 lg:px-12 xl:px-16">
                {
                    blogs.map((item, index) => {
                        return (
                            <div key={index} className="h-[200px] md:h-[240px] lg:h-[300px] xl:h-[390px] w-[100%] rounded md:rounded-[10px] overflow-hidden cursor-pointer duration-500 border-gray-300 border-[1px]">
                                <div className='w-full h-[50%] md:h-[55%] rounded-sm md:rounded overflow-hidden border-b'>
                                    <img src={item.image} alt="" className='h-full w-full object-fill' />
                                </div>
                                <div className="relative h-[50%] md:h-[45%] px-2 lg:px-5 py-[2px]">
                                    <p className='text-[7px] md:text-[8px] lg:text-[10px] xl:text-[11px] text-slate-500 font-semibold'>{item.date}</p>
                                    <h4 className="text-[10px] md:text-[11px] lg:text-[13px] xl:text-[16px] font-semibold leading-[1] mt-[2px] line-clamp-2">{item.title}</h4>
                                    <p className='text-[8px] lg:text-[9px] xl:text-[11px] text-slate-500 tracking-tight leading-[1] mt-1 line-clamp-4 lg:line-clamp-5 xl:line-clamp-6'>{item.content}</p>
                                    <button className="text-[8px] md:text-[10px] lg:text-[12px] md:mt-[4px] h-auto w-full border border-slate-400 rounded-2xl py-[3px] md:py-[4px] lg:py-[5px] xl:py-[6px] active:bg-slate-200 lg:hover:bg-[rgb(8,43,61)] lg:hover:text-white font-medium">Read More <i className="fi fi-br-arrow-circle-right relative top-[1px]"></i></button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <ViewAllIcon navigate="/blog" className="flex md:hidden px-5 md:px-8 lg:px-12 xl:px-16" />

        </div>
    )
}

export default ShopBlogs
