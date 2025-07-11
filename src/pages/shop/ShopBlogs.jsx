import HeadingText from "@/components/HeadingText";
import TabSwitcher from "@/components/TabSwitcher";
import ViewAllIcon from "@/components/ViewAllIcon";
import { useState } from "react"


function ShopBlogs() {
    const tabs = ["Popular", "Latest"];
    const [activeTab, setActiveTab] = useState(tabs[0]);

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
        <div className="space-y-2 lg:space-y-1 px-5 md:px-8 lg:px-12 xl:px-16 border-t py-5 flex flex-col gap-0 lg:gap-2">

            <HeadingText name="Intergalactic Intel!" />

            <TabSwitcher activeTab={activeTab} setActiveTab={setActiveTab} layoutId="shop-blogs" tabs={tabs} />

            <ViewAllIcon navigate="/all-blogs" className="hidden md:flex" />

            <div className="h-auto w-full grid grid-cols-2 md:grid-cols-5 gap-x-3 gap-y-4 md:gap-x-4 md:gap-y-5 lg:gap-x-6 lg:gap-y-6">
                {
                    blogs.map((item, index) => {
                        return (
                            <div key={index} className="h-[200px] md:h-[240px] lg:h-[300px] xl:h-[390px] w-[100%] rounded md:rounded-[10px] overflow-hidden cursor-pointer duration-200 border-slate-300 border-[1px] shadow-lg pb-3">
                                <div className='w-full h-[50%] md:h-[55%] rounded-sm md:rounded overflow-hidden border-b'>
                                    <img src={item.image} alt="" className='h-full w-full object-fill' />
                                </div>
                                <div className="relative h-[50%] md:h-[45%] px-2 lg:px-5 py-[2px] flex flex-col justify-between">
                                    <div className="">
                                        <p className='text-[7px] md:text-[8px] lg:text-[10px] xl:text-[11px] text-[rgb(240,85,120)] font-semibold'>{item.date}</p>
                                        <h4 className="text-[10px] md:text-[11px] lg:text-[13px] xl:text-[16px] font-semibold leading-[1] mt-[2px] line-clamp-2">{item.title}</h4>
                                        <p className='text-[8px] lg:text-[9px] xl:text-[11px] text-slate-500 tracking-tight leading-[1.2] font-medium mt-1 line-clamp-4 lg:line-clamp-5 xl:line-clamp-5 mb-1'>{item.content}</p>
                                    </div>
                                    <button className={`flex items-center justify-center text-base font-semibold py-1 rounded-full w-full h-10 lg:hover:scale-[1.03] duration-200 lg:active:scale-[0.97] lg:hover:shadow-[0px_0px_8px_-3px_rgb(8,43,61)] tracking-tight border border-slate-300 lg:hover:bg-[rgb(8,43,61)] lg:hover:text-white`}><i className="fi fi-ss-book-alt relative top-0.5 mr-2"></i>Read</button>
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
