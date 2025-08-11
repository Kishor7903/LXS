import starIcon from "../../assets/commonIcons/Rewards 2 (Fill).png"

function ShopSettingMyRatingsAndReviews() {
    return (
        <div className="w-full h-full pl-5 flex gap-5 ">
            <div className="w-[60%] flex flex-col justify-between">
                <div className="leading-[1] font-semibold flex justify-between border-b-2 border-[rgb(8,43,61)] h-10">
                    <span>Judgement Mode Activated 🗣️<br />
                        <p className="text-xs font-normal">Where ratings shine or crash into a black hole!</p>
                    </span>
                    <div className="text-sm rounded-full px-3 h-8 flex justify-center items-center">
                        <label htmlFor="">Sort By :</label>
                        <select className="focus:outline-none text-blue-500">
                            <option value="">Newest First</option>
                            <option value="">Oldest First</option>
                            <option value="">Low to High</option>
                            <option value="">High to Low</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-3 h-full py-2 px-2 overflow-y-scroll no-scrollbar">
                    {
                        [1, 2, 3, 4, 5].map((_, index) => (
                            <div key={index} className="border border-slate-300 shadow-md bg-slate-100 rounded-xl relative p-2 space-y-2 lg:hover:scale-[1.02] lg:active:scale-[0.98] duration-200 cursor-pointer">
                                <div className="flex gap-2 justify-start">
                                    <img src="https://rukminim2.flixcart.com/image/612/612/l5ld8y80/smartwatch/r/q/t/-original-imagg8dksgct9hxg.jpeg?q=70" alt="" className="w-10 border" />
                                    <div className="">
                                        <h4 className="text-xl font-bold">LXS Signature Tee</h4>
                                        <p className="text-xs">29 March, 2025</p>
                                    </div>
                                    <div className="absolute right-5 top-1 flex items-end flex-col gap-2">
                                        <div className="flex gap-[3px]">
                                            {
                                                [1, 2, 3, 4, 5].map((_, idx) => (
                                                    <img key={idx} src={starIcon} alt="" className="h-3" />
                                                ))
                                            }
                                        </div>
                                        <p className="text-xs font-medium">Amazing Quality & Unique Designs!</p>
                                    </div>
                                </div>
                                <p className="text-[12px] leading-[1.2] line-clamp-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente numquam eum unde accusantium nisi beatae atque veniam totam. Similique quod voluptatum doloribus enim eius sequi labore vel iste unde, dolor sed tempora porro hic, odio illo eum autem fugiat assumenda.</p>
                            </div>
                        ))
                    }
                </div>
                <hr className="border-[rgb(8,43,61)] border" />
            </div>
            <div className="border w-[40%] h-full rounded-3xl shadow-[inset_0px_0px_10px_-1px_rgb(8,43,61)]"></div>
        </div>
    )
}

export default ShopSettingMyRatingsAndReviews
