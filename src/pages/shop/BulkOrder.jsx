import HeadingText from "@/components/HeadingText"
import img from "../../assets/Banners/Banner12.png"


function BulkOrder() {
    return (
        <>
            <div className="h-[650px] w-full " style={({ backgroundImage: `url(${img})`, backgroundPosition: "center", backgroundSize: "cover" })}>
                <div className="w-1/2 h-full flex flex-col gap-5 pl-20 py-10">
                    <h2 className="text-3xl font-extrabold text-green-800">COSMIC SUPPLY HUB - GEAR UP IN BULK</h2>
                    <span className="text-[100px] text-orange-500 font-extrabold relative bottom-7 dancingScript tracking-wide">Bulk</span>
                    <span className="text-[130px] font-extrabold relative bottom-28 text-green-800">ORDER</span>
                    <div className="relative bottom-36">
                        <p className="w-2/3 text-lg leading-6 opacity-80 mb-10">Embark on a journey with us! Whether you're outfitting your starship crew or gearing up for an epic mission, our bulk order service ensures you're equipped for the voyage ahead.</p>
                        <span className=" text-xl font-semibold">EXPLORE THIS UNIVERSE WITH US! </span>
                        <p className="mb-5 text-lg opacity-80 ">For shipment of 25 Units or more.</p>
                        <button className="text-xl font-semibold rounded-full px-10 py-1 lg:py-3 text-white bg-gradient-to-r from-[rgb(248,181,44)] to-[rgb(253,84,120)]">Submit Your Requirement !</button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2 px-16 py-5">
                {/* <HeadingText name="Explore By Category" className="text-[40px]" />
                <div className="flex gap-5 w-full my-5">
                    {
                        ["T-Shirt", "Shirt", "Jeans", "Hoodie", "SweatShirt"].map((item, idx) => (
                            <div className="w-1/5 text-center">
                                <div key={idx} className="h-40 w-full border border-[rgb(8,43,61,0.5)] rounded-2xl "></div>
                                <h6 className="text-lg font-medium">{item}</h6>
                            </div>
                        ))
                    }
                </div> */}
                <HeadingText name="For You !" className="text-[40px]" />
                <div className="flex flex-wrap gap-5">
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((_, idx) => (
                            <div key={idx} className="h-60 w-[18.8%] rounded-2xl border border-[rgb(8,43,61,0.5)]"></div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default BulkOrder
