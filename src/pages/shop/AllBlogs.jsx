import HeadingText from "@/components/HeadingText"
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"


function AllBlogs() {
    let navigate = useNavigate();
    let { blogs } = useSelector(state => state.admin);

    return (
        <div className="flex flex-col gap-5 px-16 py-5">
            <div className="flex items-center justify-start relative">
                <div className="leading-[1] font-semibold">Flight Path Monitor 📡 <br />
                    <p className="text-xs font-normal">Your order has entered hyperspace — ready to land.</p>
                </div>
                <HeadingText name="Blog Vault" className="text-[40px] absolute left-[calc(50%-125px)]" />
            </div>
            <div className="h-auto w-full grid grid-cols-2 md:grid-cols-5 2xl:grid-cols-6 gap-x-3 gap-y-4 md:gap-x-5 md:gap-y-5 lg:gap-x-6 lg:gap-y-6 xl:gap-x-7 xl:gap-y-8">
                {
                    blogs.map((item, index) => (
                        <div key={index} className="rounded-3xl overflow-hidden cursor-pointer border-slate-300 border-[1px] shadow-md pb-3 " onClick={() => navigate(`/blog/${item.id}`)}>
                            <div className='w-full rounded-sm md:rounded overflow-hidden border-b'>
                                <img src={item.img_url} alt="" className='h-full w-full object-fill' />
                            </div>
                            <div className="relative h-[50%] md:h-[45%] px-1 lg:px-3 py-[2px] flex flex-col">
                                <h4 className="text-[10px] md:text-[11px] lg:text-[13px] xl:text-[14px] font-semibold leading-[1.2] line-clamp-2">{item.heading}</h4>
                                <p className='text-[7px] md:text-[8px] lg:text-[10px] font-semibold text-[rgb(253,84,120)]'>{`${item.timestamp.split(" ")[1]} ${item.timestamp.split(" ")[2]} ${item.timestamp.split(" ")[3].split(",")[0]}`}</p>
                                <button className={`flex mt-2 items-center justify-center text-base font-semibold py-1 rounded-full w-full h-10 duration-200 tracking-tight border border-slate-300 lg:hover:bg-[rgb(8,43,61)] lg:hover:text-white`}><i className="fi fi-ss-book-alt relative top-0.5 mr-2"></i>Read</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default AllBlogs
