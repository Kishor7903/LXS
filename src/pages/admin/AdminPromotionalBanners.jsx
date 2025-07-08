import AdminHeadings from '@/components/AdminHeadings'
import banner1 from "../../assets/Banners/Promotional Image 1.jpg"
import banner2 from "../../assets/Banners/Promotional Image 2.png"
import banner3 from "../../assets/Banners/Promotional Image 3.png"
import banner4 from "../../assets/Banners/Promotional Image 4.jpg"

function AdminPromotionalBanners() {
    return (
        <div className='w-full'>
            <AdminHeadings title="Promotional Banners" ></AdminHeadings>
            <div className="p-8 bg-white w-full border flex gap-10">
                <div className="w-[60%] border rounded-xl h-[400px] relative overflow-hidden">
                    <img src={banner1} alt="" className='w-full h-full object-fill' />
                    {
                        banner1 && 
                        <div className="absolute top-0 right-0 flex h-full w-2/6 bg-transparent flex-col justify-center items-end p-1 gap-5 text-gray-100 text-4xl shadow-[inset_-85px_0px_45px_-30px_rgb(0,0,0,0.5)]">
                            <i className="fi fi-rr-file-edit cursor-pointer hover:bg-[rgb(255,255,255,0.25)] flex justify-center items-center p-2 rounded-xl"></i>
                            <i className="fi fi-rs-trash cursor-pointer hover:bg-[rgb(255,255,255,0.25)] flex justify-center items-center p-2 rounded-xl"></i>
                        </div>
                    }
                </div>
                <div className="w-[40%] flex flex-col gap-10">
                    <div className="flex h-1/2 gap-10">
                        <div className="w-1/2 border relative rounded-xl overflow-hidden">
                            <img src={banner2} alt="" className='w-full h-full object-fill' />
                            <div className="absolute top-0 right-0 flex h-full w-2/6 bg-transparent flex-col justify-center items-end p-1 gap-5 text-gray-100 text-4xl shadow-[inset_-85px_0px_45px_-30px_rgb(0,0,0,0.5)]">
                                <i className="fi fi-rr-file-edit cursor-pointer hover:bg-[rgb(255,255,255,0.25)] flex justify-center items-center p-2 rounded-xl"></i>
                                <i className="fi fi-rs-trash cursor-pointer hover:bg-[rgb(255,255,255,0.25)] flex justify-center items-center p-2 rounded-xl"></i>
                            </div>
                        </div>
                        <div className="w-1/2 border relative rounded-xl overflow-hidden">
                            <img src={banner3} alt="" className='w-full h-full object-fill' />
                            <div className="absolute top-0 right-0 flex h-full w-2/6 bg-transparent flex-col justify-center items-end p-1 gap-5 text-gray-100 text-4xl shadow-[inset_-85px_0px_45px_-30px_rgb(0,0,0,0.5)]">
                                <i className="fi fi-rr-file-edit cursor-pointer hover:bg-[rgb(255,255,255,0.25)] flex justify-center items-center p-2 rounded-xl"></i>
                                <i className="fi fi-rs-trash cursor-pointer hover:bg-[rgb(255,255,255,0.25)] flex justify-center items-center p-2 rounded-xl"></i>
                            </div>
                        </div>
                    </div>
                    <div className="h-1/2 border relative rounded-xl overflow-hidden">
                        <img src={banner4} alt="" className='w-full h-full object-fill' />
                        <div className="absolute top-0 right-0 flex h-full w-2/6 bg-transparent flex-col justify-center items-end p-1 gap-5 text-gray-100 text-4xl shadow-[inset_-85px_0px_45px_-30px_rgb(0,0,0,0.5)]">
                            <i className="fi fi-rr-file-edit cursor-pointer hover:bg-[rgb(255,255,255,0.25)] flex justify-center items-center p-2 rounded-xl"></i>
                            <i className="fi fi-rs-trash cursor-pointer hover:bg-[rgb(255,255,255,0.25)] flex justify-center items-center p-2 rounded-xl"></i>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AdminPromotionalBanners
