import { getAllReviewsByUser, getWebsiteReview } from "@/firebase/auth"
import starIconFill from "../../assets/commonIcons/Rewards 2 (Fill).png"
import starIconStroke from "../../assets/commonIcons/Rewards 2 (Stroke).png"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import TabSwitcher from "@/components/TabSwitcher";

function ShopSettingMyRatingsAndReviews() {
    let [productReviews, setProductReviews] = useState([]);
    let [websiteReviews, setWebsiteReviews] = useState([]);
    let [sortBy, setSortBy] = useState("newest");
    let { user } = useSelector(state => state.auth);
    let { products } = useSelector(state => state.admin);
    const tabs = ["Product Reviews", "Website Reviews"];
    const [activeTab, setActiveTab] = useState(tabs[0]);

    useEffect(() => {
        getAllReviewsByUser(user.id).then(res => {
            setProductReviews(res);
        })
        getWebsiteReview().then(res => {
            setWebsiteReviews(() => {
                return res.filter((i) => i.userId === user.id)
            });
        })
    }, [])

    useEffect(() => {
        if(sortBy === "newest"){
            setProductReviews(() => {
                return productReviews.sort((a, b) => { return new Date(b.timestamp) - new Date(a.timestamp) });
            })
            setWebsiteReviews(() => {
                return websiteReviews.sort((a, b) => { return new Date(b.timestamp) - new Date(a.timestamp) });
            })
        }else{
            setProductReviews(() => {
                return productReviews.sort((a, b) => { return new Date(a.timestamp) - new Date(b.timestamp) });
            })
            setWebsiteReviews(() => {
                return websiteReviews.sort((a, b) => { return new Date(a.timestamp) - new Date(b.timestamp) });
            })
        }
    }, [sortBy, setSortBy, productReviews, websiteReviews])

    return (
        <div className="w-full h-full pl-5 flex gap-5 ">
            <div className="w-[60%] flex flex-col justify-between">
                <div className="leading-[1] font-semibold flex justify-between h-10">
                    <span>Judgement Mode Activated 🗣️<br />
                        <p className="text-xs font-normal">Where ratings shine or crash into a black hole!</p>
                    </span>
                    <div className="text-sm rounded-full px-3 h-8 flex justify-center items-center">
                        <label htmlFor="">Sort By :</label>
                        <select className="focus:outline-none text-[rgb(59,130,246)]" value={sortBy} onChange={(e) => {e.preventDefault(), setSortBy(e.target.value)}}>
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                        </select>
                    </div>
                </div>
                <TabSwitcher activeTab={activeTab} setActiveTab={setActiveTab} layoutId="reviews" tabs={tabs} className="h-12 p-[5px] rounded-xl w-[98%] mx-auto my-2" activeClassName="rounded-[10px]" textClassName="uppercase" />

                <div className="space-y-3 h-full py-2 px-2 overflow-y-scroll no-scrollbar">
                    {
                        activeTab === "Product Reviews" ?
                        productReviews.map((review, index) => (
                            <div key={index} className="border w-[99%] mx-auto border-slate-300 shadow-md bg-slate-100 rounded-xl relative p-3 space-y-2 cursor-pointer">
                                <div className="flex gap-3 justify-start">
                                    <div className="w-[90px] rounded-[6px] shadow-md">
                                        <img src={(() => {
                                            let product = products.find((item) => item.id === review.productId);
                                            return product.images[0];
                                        })()} alt="" className="w-full object-fill" />
                                    </div>
                                    <div className="relative">
                                        <h4 className="text-xl font-bold line-clamp-1 w-[65%] text-[rgb(8,43,61,0.7)]">{(() => {
                                            let product = products.find((item) => item.id === review.productId);
                                            return product.name;
                                        })()}</h4>
                                        <p className="text-xs font-semibold text-[rgb(253,84,120)]">{`${review.timestamp.split(",")[0]}, ${review.timestamp.split(",")[1]}`}</p>
                                        <p className="text-[15px] font-semibold absolute bottom-0 left-0 leading-[1.2] mt-1 line-clamp-1 w-[65%]">{review.title}</p>
                                    </div>
                                    <div className="absolute right-4 top-0 py-3 flex flex-col justify-between h-full items-end ">
                                        <div className="flex items-end gap-1">
                                            {
                                                [1, 2, 3, 4, 5].map((_, idx) => (
                                                    <img key={idx} src={idx < review.productRating ? starIconFill : starIconStroke} alt="" className="h-7" />
                                                ))
                                            }
                                        </div>
                                        <button className="w-full text-sm rounded-xl lg:hover:scale-[1.05] lg:active:scale-[0.98] duration-200 lg:hover:bg-[rgb(8,43,61)] lg:hover:text-white bg-white border border-slate-300 shadow px-3 py-2 flex justify-start items-center font-semibold gap-2 "><i className="fi fi-sr-feedback relative top-[2px] mr-1"></i>Edit Product Review<i className="fi fi-br-angle-double-small-right relative top-[2px] ml-1"></i></button>
                                    </div>
                                </div>
                            </div>
                        ))
                        :
                        websiteReviews.map((review, index) => (
                            <div key={index} className="border w-[99%] mx-auto border-slate-300 shadow-md bg-slate-100 rounded-xl relative p-3 space-y-2 cursor-pointer">
                                <div className="flex gap-3 justify-start">
                                    <div className="relative w-full">
                                        <h4 className="font-semibold line-clamp-1 text-[rgb(8,43,61,0.7)] mb-1">{review.description}</h4>
                                        <div className="flex gap-2 h-7 items-center">
                                            <p className="font-semibold text-[rgb(253,84,120)]">{review.name}</p>
                                            <p className="text-sm font-semibold line-clamp-1">({review.email})</p>
                                        </div>
                                    </div>
                                    <div className="absolute right-4 bottom-2 flex flex-col justify-between h-8 items-end ">
                                        <div className="flex items-end gap-1">
                                            {
                                                [1, 2, 3, 4, 5].map((_, idx) => (
                                                    <img key={idx} src={idx < review.rating ? starIconFill : starIconStroke} alt="" className="h-7" />
                                                ))
                                            }
                                        </div>
                                        {/* <button className="w-full text-sm rounded-xl lg:hover:scale-[1.05] lg:active:scale-[0.98] duration-200 lg:hover:bg-[rgb(8,43,61)] lg:hover:text-white bg-white border border-slate-300 shadow px-3 py-2 flex justify-start items-center font-semibold gap-2 "><i className="fi fi-sr-feedback relative top-[2px] mr-1"></i>Edit Product Review<i className="fi fi-br-angle-double-small-right relative top-[2px] ml-1"></i></button> */}
                                    </div>
                                </div>
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
