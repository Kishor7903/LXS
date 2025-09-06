import img1 from "../../assets/whatWeDo/Brand.png"
import img2 from "../../assets/whatWeDo/Sell.png"
import img3 from "../../assets/whatWeDo/Job.png"
import img4 from "../../assets/whatWeDo/Artwork.png"
import img5 from "../../assets/whatWeDo/Collaboration.png"
import HeadingWithUnderline from "@/components/HeadingWithUnderline"


function WhatWeDo() {
    const items = [
        {
            text1: "Our Branded Products",
            text2: "Explore our exclusive LXS Originals products—premium, space-inspired designs crafted for comfort, individuality, and modern style with every detail.",
            isIntegratingSoon: false,
            image: img1
        },
        {
            text1: "Sell on LXS Store",
            text2: "Join LXS Store to showcase your brand, reach new customers, and grow your business with our premium eCommerce platform.",
            isIntegratingSoon: true,
            image: img2
        },
        {
            text1: "Brand Collaboration",
            text2: "We connect brands with ideal influencers, bridging the gap for impactful promotions and targeted audience engagement across digital and social platforms.",
            isIntegratingSoon: true,
            image: img5
        },
        {
            text1: "Post & Find a Job",
            text2: "Tackling unemployment in India—LXS offers a platform for companies to post jobs and users to find opportunities easily.",
            isIntegratingSoon: true,
            image: img3
        },
        {
            text1: "Art Marketplace",
            text2: "Showcasing creativity—our marketplace empowers artists to sell unique creations while connecting buyers with original, inspiring, and meaningful artworks daily.",
            isIntegratingSoon: true,
            image: img4
        },
    ];

    return (
        <div className="py-5 lg:py-10 space-y-2 lg:space-y-5 lg:px-12 xl:px-20 border-t flex flex-col items-center">

            <HeadingWithUnderline name="What We Do!" />

            <div className="h-auto w-full flex gap-x-10 justify-center flex-1">
                {
                    items.map((item, index) => {
                        return (
                            <div key={index} className={`flex flex-col items-center w-1/5 gap-2 md:gap-1 lg:gap-0 text-sm border-[2px] rounded-3xl p-5 relative overflow-hidden ${item.isIntegratingSoon ? "border-[rgb(253,84,120)] bg-[rgb(253,238,241)]" : " bg-slate-200 border-[rgb(8,43,61)] "}`}>
                                <img src={item.image} alt="" className='h-8 md:h-12 lg:h-20' />
                                <span className='font-bold text-[10px] md:text-[13px] lg:text-[18px] lg:mt-1 text-center leading-[1] flex gap-1 flex-col'>{item.text1}</span>
                                <p className='relative -top-3 -md:top-2 sm:top-0 text-[7px] md:text-[9px] lg:text-[13px] text-center leading-[1.1] tracking-tight md:tracking-normal mt-1 font-medium lg:mt-2'>{item.text2}</p>
                                <div className={`h-12 w-12 absolute -top-[1px] -right-[1px] flex justify-center items-center rounded-bl-3xl ${item.isIntegratingSoon ? "bg-transparent border-b-[2px] border-l-[2px] text-[rgb(253,84,120)] border-[rgb(253,84,120)]" : "bg-[rgb(8,43,61)]"}`}>
                                <i className={`text-2xl relative top-1 left-[2px] ${!item.isIntegratingSoon ? "fi fi-rr-badge-check text-white" : "fi fi-sr-duration-alt"}`}></i>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default WhatWeDo
