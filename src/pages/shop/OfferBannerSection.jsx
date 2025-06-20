import banner1 from "../../assets/Banners/Promotional Image 1.png"
import banner2 from "../../assets/Banners/Promotional Image 2.png"
import banner4 from "../../assets/Banners/Promotional Image 3.png"
import banner3 from "../../assets/Banners/Promotional Image 4.png"

function OfferBannerSection() {
    return (
        <div className="h-[300px] md:h-[250px] lg:h-[450px] 2xl:h-[550px] w-full flex flex-col items-center md:flex-row justify-between gap-2 md:gap-7 lg:gap-10 2xl:gap-14 px-3 md:px-12 lg:px-14 xl:px-20 2xl:px-32 py-1 mx-auto my-3 lg:my-10">
            <div className="h-[55%] md:h-full w-full md:w-[60%] rounded-xl lg:rounded-2xl overflow-hidden border border-[rgb(8,43,61,0.2)] cursor-pointer hover:scale-[1.01] duration-150 hover:shadow-[0px_0px_20px_-1px_rgb(8,43,61)] lg:hover:border-none">
                <img src={banner1} alt="" className="h-full w-full object-fill" />
            </div>
            <div className="h-[45%] md:h-full w-full md:w-[40%] flex flex-row md:flex-col gap-2 md:gap-4 lg:gap-7 2xl:gap-10">
                <div className="w-[30%] md:w-full h-full md:h-[50%] flex flex-col md:flex-row gap-2 md:gap-4 lg:gap-7 2xl:gap-10">
                    <div className="h-[50%] md:h-full w-full md:w-[50%] rounded-xl lg:rounded-2xl overflow-hidden  cursor-pointer hover:scale-[1.03] duration-150 hover:shadow-[0px_0px_20px_-1px_rgb(8,43,61)]">
                        <img src={banner2} alt="" className="h-full w-full object-fill" />
                    </div>
                    <div className="h-[50%] md:h-full w-full md:w-[50%] rounded-xl lg:rounded-2xl overflow-hidden  cursor-pointer hover:scale-[1.03] duration-150 hover:shadow-[0px_0px_20px_-1px_rgb(8,43,61)]">
                        <img src={banner3} alt="" className="h-full w-full object-fill" />
                    </div>
                </div>
                <div className="h-full md:h-[50%] w-[70%] md:w-full rounded-xl lg:rounded-2xl overflow-hidden border border-[rgb(8,43,61,0.2)] cursor-pointer hover:scale-[1.02] duration-150 hover:shadow-[0px_0px_20px_-1px_rgb(8,43,61)] lg:hover:border-none">
                    <img src={banner4} alt="" className="h-full w-full object-fill" />
                </div>
            </div>
        </div>
    )
}

export default OfferBannerSection
