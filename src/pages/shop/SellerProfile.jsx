import Breadcrum from "@/components/Breadcrum"
import { Link } from "react-router-dom"
import starIconStroke from "../../assets/commonIcons/Rewards 2 (Stroke).png"
import starIconFill from "../../assets/commonIcons/Rewards 2 (Fill).png"
import { useState } from "react"
import { Progress } from "@/components/ui/progress"


function SellerProfile() {
    let [sellerOverallRating, setSellerOverallRating] = useState(0);
    let [sellerRating, setSellerRating] = useState(0);

    let items = [
        {
            label: "Your Orders",
            path: "../setting/my-orders"
        },
        {
            label: "Order Details",
            path: "/orders/seller-profile"
        },
        {
            label: "Seller Profile"
        }
    ]

    let ratings = [
        {
            title: "5 Star",
            value: 85
        },
        {
            title: "4 Star",
            value: 11
        },
        {
            title: "3 Star",
            value: 0
        },
        {
            title: "2 Star",
            value: 1
        },
        {
            title: "1 Star",
            value: 5
        },
    ]

    let reviews = [
        {
            stars: 3,
            by: "Sunita",
            on: "23.05.2024",
            description: "Nice"
        },
        {
            stars: 5,
            by: "patel",
            on: "21.05.2024",
            description: "Excellent Products"
        },
        {
            stars: 1,
            by: "Aman",
            on: "11.10.2024",
            description: "Seller Not Responding"
        },
        {
            stars: 3,
            by: "Sunita",
            on: "23.05.2024",
            description: "Nice"
        },
    ]


    return (
        <>
            <Breadcrum items={items} />
            <div className="w-full h-[95%] pl-4 mt-4 flex gap-10">
                <div className="w-7/12">
                    <div className="leading-[1] font-semibold">Leave Seller Feedback 🚀 <br />
                        <p className="text-xs font-normal">Share a Experience, leave a review and help others!</p>
                    </div>
                    <div className="h-[91%] w-full shadow-[0px_0px_10px_-2px_rgb(8,43,61)] rounded-3xl mt-5 px-8 py-5 flex justify-between">
                        <div className="w-1/2">
                            <div className="flex gap-5 items-center">
                                <img src="https://rukminim2.flixcart.com/image/612/612/xif0q/smartwatch/n/v/1/-original-imah6s6pq7wxa4u6.jpeg?q=70" alt="" className="h-32 border" />
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs leading-[0.3]">
                                        <p>Since 5 January, 2025 </p>
                                        <p className="text-xl font-extrabold">LXS Store</p>
                                        <Link className="text-blue-500 font-medium">View all products of this seller</Link>
                                    </span>
                                    <span className="text-xs leading-[1.2] mt-3">
                                        <p className="text-orange-500 font-medium">Seller Information</p>
                                        <p className="font-semibold">Name: S*c*i* K*m*r</p>
                                        <p>Contact No: +91 6203******</p>
                                        <p>Email: sa*************@gmail.com</p>
                                        <p>Store Address: Plot no.45 ********</p>
                                    </span>
                                </div>
                            </div>
                            <div className="mt-3 ">
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-3 ">
                                        {
                                            [1, 2, 3, 4, 5].map((item, index) => (
                                                <img key={index} src={item <= sellerOverallRating ? starIconFill : starIconStroke} alt="" className="h-7 cursor-pointer" onClick={() => setSellerOverallRating(item)} />
                                            ))
                                        }
                                    </div>
                                    <select className="border border-[rgb(8,43,61)] rounded-full font-semibold focus:outline-none py-1 px-1 text-xs">
                                        <option value="">Last Month</option>
                                        <option value="">6 Months</option>
                                        <option value="">12 Months</option>
                                        <option value="">3 Years</option>
                                    </select>
                                </div>
                                <p className="text-xs mt-2">94% positive in the last month</p>
                                <p className="text-blue-400 text-xs font-medium relative bottom-[2px]">891 Ratings</p>
                                <div className="p-5 flex flex-col gap-1 font-semibold relative bottom-2 text-sm">
                                    {
                                        ratings.map((item, index) => (
                                            <div key={index} className="flex gap-2 items-center">
                                                <p>{item.title}</p>
                                                <Progress className="w-2/3" value={item.value} />
                                                <p>{item.value}%</p>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="bg-blue-950 rounded-2xl h-[120px] text-white px-6 py-4 text-sm font-semibold flex flex-col items-center">
                                    <p>"Unlock Seller details and exclusive insights"</p>
                                    <p>Subscribe now for full access!</p>
                                    <button className="text-sm bg-gradient-to-r from-orange-500 to-red-500 px-3 mt-5 py-1 rounded-full">Upgrade to LXS Prime</button>
                                </div>
                            </div>
                        </div>
                        <div className="w-[45%] pt-3">
                            <div className="flex gap-5 items-center text-sm font-semibold relative bottom-2 "> Rate Seller :
                                <div className="flex gap-3 relative bottom-1">
                                    {
                                        [1, 2, 3, 4, 5].map((item, index) => (
                                            <img key={index} src={item <= sellerRating ? starIconFill : starIconStroke} alt="" className="h-7 cursor-pointer" onClick={() => setSellerRating(item)} />
                                        ))
                                    }
                                </div>
                            </div>
                            <form action="" className="flex flex-col gap-2">
                                <input type="text" className="text-sm rounded-2xl border border-[rgb(8,43,61,0.6)] h-7 w-full px-3" placeholder="Title" />
                                <textarea className="text-sm rounded-2xl border border-[rgb(8,43,61,0.6)] h-10 w-full px-3 py-1" placeholder="Description"></textarea>
                                <button className="h-8 w-1/2 rounded-full lg:hover:bg-[rgb(8,43,61)] lg:hover:text-white self-center text-xs font-semibold border border-[rgb(8,43,61)]">Submit Seller Feedback</button>
                            </form>
                            <div className=" mt-10">
                                <div className="flex justify-between items-center text-sm font-bold">
                                    Seller Feedbacks
                                    <select className="border border-[rgb(8,43,61)] rounded-full font-semibold focus:outline-none py-1 px-1 text-xs float-right">
                                        <option value="">All Stars</option>
                                        <option value="">4 Stars</option>
                                        <option value="">3 Stars</option>
                                        <option value="">2 Stars</option>
                                        <option value="">1 Stars</option>
                                    </select>
                                </div>
                            </div>
                            <div className=" mt-5 px-3">
                                {
                                    reviews.map((item, index) => (
                                        <div key={index} className=" border-b pt-3 pb-1">
                                            <div className="flex gap-2 items-start">
                                                <div className="flex items-center space-x-1 relative bottom-[3px]">
                                                    {[...Array(5)].map((_, i) => (
                                                        <span key={i}>{i < item.stars ? <img src={starIconFill} alt="" className="h-4" /> : <img src={starIconStroke} alt="" className="h-4" />}</span>
                                                    ))}
                                                </div>
                                                <p className="text-xs text-gray-600 ">by {item.by} on {item.on}</p>
                                            </div>
                                            <p className="font-medium text-sm">"{item.description}"</p>
                                        </div>
                                    ))
                                }
                                <p className="text-blue-600 cursor-pointer mt-2 text-sm">More...</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-5/12 h-full rounded-3xl shadow-[0px_0px_10px_-1px_rgb(8,43,61)] border"></div>
            </div>
        </>
    )
}

export default SellerProfile
