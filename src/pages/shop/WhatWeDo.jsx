import img1 from "../../assets/whatWeDo/Brand.png"
import img2 from "../../assets/whatWeDo/Sell.png"
import img3 from "../../assets/whatWeDo/Job.png"
import img4 from "../../assets/whatWeDo/Artwork.png"
import img5 from "../../assets/whatWeDo/Collaboration.png"


function WhatWeDo() {
    const items = [
        {
            text1: "Selling our Branded Products",
            text2: "Experience the exclusive LXS Store collection, featuring premium, space-inspired clothing and accessories designed to redefine style and comfort.",
            image: img1
        },
        {
            text1: "Anyone can Sell on LXS Store",
            text2: "Our platform empowers individuals and businesses to sell their products, making entrepreneurship accessible and seamless.",
            text3: "Option Integrating Soon...",
            image: img2
        },
        {
            text1: "Connecting Infuencers with Brand",
            text2: "We bridge the gap between social media influencers and companies, enabling brands to find the perfect influencers to reach their target audience for successful promotions.",
            text3: "Option Integrating Soon...",
            image: img5
        },
        {
            text1: "Publish a Job & Find a Job",
            text2: "Addressing the growing unemployment crisis in India, we've created a dedicated space for companies to post job openings and for users to easily find and apply for jobs.",
            text3: "Option Integrating Soon...",
            image: img3
        },
        {
            text1: "Anyone can Buy & Sell their Artworks",
            text2: "Showcasing creativity! A dedicated marketplace where artists can sell their unique creations and buyers can discover inspiring artworks.",
            text3: "Option Integrating Soon...",
            image: img4
        },
    ];

    return (
        <div className="pt-5 lg:pt-10 space-y-2 lg:space-y-5 lg:px-12 xl:px-32 border-t flex flex-col items-center">

            <h2 className='text-xl md:text-3xl font-bold relative after:h-1 after:absolute after:w-2/3 after:flex after:mx-[16%] after:bottom-0 after:bg-[rgb(8,43,61)] after:rounded-full'>What We Do!</h2>

            <div className="h-auto w-full flex flex-wrap gap-x-5 xl:gap-x-32 gap-y-0 md:gap-y-5 xl:gap-y-9 justify-center items-center flex-1 py-2 md:py-5">
                {
                    items.map((item, index) => {
                        return (
                            <div key={index} className="w-[24%] lg:w-[25%] h-56 flex flex-col items-center gap-2 md:gap-1 lg:gap-0 text-sm border rounded-3xl p-5 shadow-[0px_0px_10px_1px_rgb(8,43,61)]">
                                <img src={item.image} alt="" className='h-8 md:h-12 lg:h-20' />
                                <span className='font-extrabold text-[10px] md:text-[13px] lg:text-[18px] lg:mt-1 text-center leading-[1] flex gap-1 flex-col'>{item.text1} <br /><span className="text-red-500 font-semibold">{item.text3 ? `(${item.text3})` : null}</span></span>
                                <p className='relative -top-3 -md:top-2 sm:top-0 text-[7px] md:text-[9px] lg:text-[13px] text-center leading-[1.1] tracking-tight md:tracking-normal mt-1 font-medium lg:mt-2'>{item.text2}</p>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default WhatWeDo
