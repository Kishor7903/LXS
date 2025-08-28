import HeadingWithUnderline from "@/components/HeadingWithUnderline";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function ShopBlogs() {
    let navigate = useNavigate();
    let { blogs } = useSelector(state => state.admin);

    return (
        <div className="space-y-2 lg:space-y-1 px-5 md:px-8 lg:px-12 xl:px-16 border-t py-5 flex flex-col gap-0 lg:gap-2">

            <HeadingWithUnderline name="Intergalactic Intel!" className="mb-5" />

            <div className="h-auto w-full grid grid-cols-2 md:grid-cols-5 2xl:grid-cols-6 gap-x-3 gap-y-4 md:gap-x-5 md:gap-y-5 lg:gap-x-6 lg:gap-y-6 xl:gap-x-7 xl:gap-y-8">
                {
                    blogs.slice(0, 6).map((item, index) => {
                        return (
                            <div key={index} className="h-[200px] md:h-[240px] lg:h-[300px] xl:h-[270px] rounded-3xl overflow-hidden cursor-pointer border-slate-300 border-[1px] shadow-md pb-3 " onClick={() => navigate(`/blog/${item.id}`)}>
                                <div className='w-full h-[40%] md:h-[60%] rounded-sm md:rounded overflow-hidden border-b'>
                                    <img src={item.img_url} alt="" className='h-full w-full object-fill' />
                                </div>
                                <div className="relative h-[50%] md:h-[45%] px-1 lg:px-3 py-[2px] flex flex-col">
                                    <h4 className="text-[10px] md:text-[11px] lg:text-[13px] xl:text-[14px] font-semibold leading-[1.2] line-clamp-2">{item.heading}</h4>
                                    <p className='text-[7px] md:text-[8px] lg:text-[10px] font-semibold mt-1'>Posted On: <span className="text-[rgb(253,84,120)]">{`${item.timestamp.split(" ")[1]} ${item.timestamp.split(" ")[2]} ${item.timestamp.split(" ")[3].split(",")[0]}`}</span></p>
                                    <button className={`flex mt-2 items-center justify-center text-base font-semibold py-1 rounded-full w-full h-10 duration-200 tracking-tight border border-slate-300 lg:hover:bg-[rgb(8,43,61)] lg:hover:text-white`}><i className="fi fi-ss-book-alt relative top-0.5 mr-2"></i>Read</button>
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
