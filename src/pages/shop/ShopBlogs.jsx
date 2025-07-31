import HeadingWithUnderline from "@/components/HeadingWithUnderline";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function ShopBlogs() {
    let navigate = useNavigate();
    let { blogs } = useSelector(state => state.admin);

    return (
        <div className="space-y-2 lg:space-y-1 px-5 md:px-8 lg:px-12 xl:px-16 border-t py-5 flex flex-col gap-0 lg:gap-2">

            <HeadingWithUnderline name="Intergalactic Intel!" className="mb-5" />

            <div className="h-auto w-full grid grid-cols-2 md:grid-cols-5 gap-x-3 gap-y-4 md:gap-x-4 md:gap-y-5 lg:gap-x-8 lg:gap-y-6">
                {
                    blogs.slice(0,4).map((item, index) => {
                        return (
                            <div key={index} className="h-[200px] md:h-[240px] lg:h-[300px] xl:h-[390px] rounded md:rounded-[10px] overflow-hidden cursor-pointer duration-200 border-slate-300 border-[1px] shadow-lg pb-3" onClick={() => navigate(`/blog/${item.id}`)}>
                                <div className='w-full h-[50%] md:h-[55%] rounded-sm md:rounded overflow-hidden border-b'>
                                    <img src={item.img_url} alt="" className='h-full w-full object-fill' />
                                </div>
                                <div className="relative h-[50%] md:h-[45%] px-2 lg:px-4 py-[2px] flex flex-col justify-between">
                                    <div className="">
                                        <p className='text-[7px] md:text-[8px] lg:text-[10px] text-[rgb(240,85,120)] font-semibold'>{`${item.timestamp.split(" ")[1]} ${item.timestamp.split(" ")[2]} ${item.timestamp.split(" ")[3].split(",")[0]}`}</p>
                                        <h4 className="text-[10px] md:text-[11px] lg:text-[13px] xl:text-[14px] font-semibold leading-[1.2] mt-[2px] line-clamp-2">{item.heading}</h4>
                                        <p className='text-[8px] lg:text-[9px] xl:text-[11px] text-slate-500 tracking-tight leading-[1.1] font-medium mt-1 line-clamp-4 lg:line-clamp-5 xl:line-clamp-5 mb-1'>{item.intro}</p>
                                    </div>
                                    <button className={`flex items-center justify-center text-base font-semibold py-1 rounded-full w-full h-10 lg:hover:scale-[1.03] duration-200 lg:active:scale-[0.97] lg:hover:shadow-[0px_0px_8px_-3px_rgb(8,43,61)] tracking-tight border border-slate-300 lg:hover:bg-[rgb(8,43,61)] lg:hover:text-white`}><i className="fi fi-ss-book-alt relative top-0.5 mr-2"></i>Read</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ShopBlogs
