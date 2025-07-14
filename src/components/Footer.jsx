import { Link } from "react-router-dom"
import facebookLogo from "../assets/Socials/Facebook.png"
import instagramLogo from "../assets/Socials/Instagram.png"
import twitterLogo from "../assets/Socials/Twitter.png"
import youtubeLogo from "../assets/Socials/Youtube.png"
import linkedinLogo from "../assets/Socials/Linkedin.png"
import whatsappLogo from "../assets/Socials/Whatsapp (Fill).png"
import LxsLogo from "../assets/commonIcons/Website Logo (TM).png"
import playStoreImg from "../assets/commonIcons/Playstore 3.png"
import appStoreImg from "../assets/commonIcons/App Store 3.png"
import { useEffect, useState } from "react"
import DialogBox from "./DialogBox"
import starIconStroke from "../assets/commonIcons/Rewards 2 (Stroke).png"
import starIconFill from "../assets/commonIcons/Rewards 2 (Fill).png"
import { addWebsiteReview } from "@/firebase/auth"
import { toast } from "react-toastify"

let menu = [
    {
        "title": "Explore the Universe",
        "menus": [
            {
                "name": "LUPIN (Story)",
                "slug": "#"
            },
            {
                "name": "Fan Art",
                "slug": "#"
            },
            {
                "name": "All Blogs",
                "slug": "/all-blogs"
            },
            {
                "name": "LXS PrimeVerse",
                "slug": "/subscription"
            },
            {
                "name": "Customers Review",
                "slug": "#"
            },
        ]
    },
    {
        "title": "Info & Support",
        "menus": [
            {
                "name": "FAQs",
                "slug": "/policy/FAQs"
            },
            {
                "name": "About Us",
                "slug": "/about-us"
            },
            {
                "name": "Contact Us",
                "slug": "/setting/contact-us"
            },
            {
                "name": "Partner with Us",
                "slug": "/partner-with-us"
            },
        ]
    },
    {
        "title": "Policies",
        "menus": [
            {
                "name": "Privacy Policy",
                "slug": "/policy/privacy-policy"
            },
            {
                "name": "Terms & Conditions",
                "slug": "/policy/terms-and-conditions"
            },
            {
                "name": "Return & Refund Policy",
                "slug": "/policy/return-and-refund-policy"
            },
            {
                "name": "Intellactual Property Policy",
                "slug": "/policy/intellectual-property-policy"
            },
            {
                "name": "Exchange & Replacement Policy",
                "slug": "/policy/exchange-and-replacemennt-policy"
            },
        ]
    },
]


function Footer() {
    let [isHovered, setIsHovered] = useState(false);
    let [isOpen, setIsOpen] = useState(false);
    let [formData, setFormData] = useState({
        name: "",
        email: "",
        description: "",
        rating: 0
    })
    let date = new Date();

    const handleSendWhatsApp = () => {
        const url = `https://wa.me/${+918987888368}`;
        window.open(url, '_blank');
    };

    const handleChange = (e) => {
        e.preventDefault();

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleCancelButton = (e) => {
        e.preventDefault();

        setIsOpen(false);
        setFormData({
            name: "",
            email: "",
            description: "",
            rating: 0
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        addWebsiteReview(formData).then(() => {
            toast.success("Reviewed Successfully");
            setIsOpen(false);
            setFormData({
                name: "",
                email: "",
                description: "",
                rating: 0
            })
        })
    }

    useEffect(() => {
        setFormData({
            name: "",
            email: "",
            description: "",
            rating: 0
        })
    }, [isOpen, setIsOpen])

    return (
        <>
            <div className="w-full min-h-44 overflow-hidden py-6 lg:pl-16 lg:pr-10 flex flex-col md:flex-row justify-between gap-y-8 border-t bg-white rounded-b-[30px] xl:rounded-b-[50px]">
                <div className="w-[20%] relative rounded mr-10">
                    <img src={LxsLogo} alt="" className="h-40" />
                </div>
                <div className="w-[28%] flex flex-col justify-between">
                    <div className="">
                        <h5 className='text-[rgb(8,43,61)] font-semibold text-center lg:text-left text-xs lg:text-xl pl-[2px]'>Connect With Our Socials!</h5>
                        <div className="flex gap-4 lg:gap-8 mt-2">
                            <Link to="https://www.instagram.com/lxslifestylestore" target="_blank"><img src={instagramLogo} alt="" className='h-6 lg:h-9 cursor-pointer' /></Link>
                            <Link to="https://www.linkedin.com/company/lxslifestylestore" target="_blank"><img src={linkedinLogo} alt="" className='h-6 lg:h-9 cursor-pointer' /></Link>
                            <Link to="https://www.x.com/lxs_store" target="_blank"><img src={twitterLogo} alt="" className='h-6 lg:h-9 cursor-pointer' /></Link>
                            <Link to="https://www.youtube.com/channel/UCGA1Te3h14lK5ePC-LGD3pg?sub_confirmation=1" target="_blank"><img src={youtubeLogo} alt="" className='h-6 lg:h-9 cursor-pointer' /></Link>
                            <Link onClick={handleSendWhatsApp} target="_blank"><img src={whatsappLogo} alt="" className='h-6 lg:h-9 cursor-pointer' /></Link>
                            <Link to="https://www.facebook.com/lxslifestylestore" target="_blank"><img src={facebookLogo} alt="" className='h-6 lg:h-9 cursor-pointer' /></Link>
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <div className="w-48 py-2 rounded-xl px-[14px] flex items-center gap-2 cursor-pointer lg:hover:scale-[1.05] bg-slate-300 lg:active:scale-[0.98] duration-150">
                            <img src={playStoreImg} alt="" className="h-9" />
                            <div className="flex flex-col justify-center items-start h-10">
                            <p className="text-xs font-medium">ADDING ON</p>
                                <p className="text-lg font-semibold leading-5">Play Store</p>
                            </div>
                        </div>
                        <div className="w-48 py-2 rounded-xl px-[14px] flex items-center gap-2 cursor-pointer lg:hover:scale-[1.03] bg-slate-300 lg:active:scale-[0.98] duration-150">
                            <img src={appStoreImg} alt="" className="h-9" />
                            <div className="flex flex-col justify-center items-start h-10">
                                <p className="text-xs font-medium">ADDING ON</p>
                                <p className="text-lg font-semibold leading-5">App Store</p>
                            </div>
                        </div>
                        
                        
                    </div>

                </div>
                <div className="w-[52%] flex justify-between px-8 gap-8 text-xs">
                    {
                        menu.map((item, index) => {
                            return (
                                <div key={index} className="text-center">
                                    <h3 className='font-bold h-10 mb-1 flex justify-center text-sm md:text-[16px] lg:text-xl leading-[1.1] tracking-tight'>{item.title}</h3>
                                    <div className="flex flex-col items-center text-[10px] md:text-xs lg:text-sm md:gap-1 tracking-tighter">
                                        {
                                            item.menus.map((link, idx) => (
                                                <Link key={idx} to={link.slug} className='active:underline lg:hover:underline font-medium h-[14px] active:font-semibold lg:hover:font-semibold'>{link.name}</Link>
                                            ))
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="bg-[rgb(8,43,61)] text-white flex flex-col px-3 py-5 gap-2 lg:gap-5 w-full overflow-hidden text-xs lg:text-sm">
                <div className="flex flex-col items-center justify-between lg:w-full lg:flex-row gap-2 lg:gap-20 mx-auto lg:px-[85px]">
                    <div className="text-gray-400 text-left w-[35%]"><p>Don't test me, I'm watching 👁👁</p><p>Copyright &copy; {date.getFullYear()} LXS Lifestyle Store - All Trademark & Rights Reserved</p></div>
                    <button className="text-white px-3 flex justify-center items-center gap-1 h-10 rounded-full border border-white lg:hover:bg-white lg:hover:text-[rgb(8,43,61)] font-medium" onClick={(e) => { e.preventDefault(), setIsOpen(true) }} onMouseEnter={() => setIsHovered(true)} onMouseOut={() => setIsHovered(false)}><i className={`${isHovered ? "fi fi-sr-file-edit" : "fi fi-rr-file-edit"} relative top-[1px]`}></i> Write Website Review</button>
                    <div className="text-gray-400 text-right w-[35%]"><p>Attention, Earthlings! This starship—uhh, I mean</p><p>This website - is officially Operated by LXSLIFESTYLESTORE (OPC) PRIVATE LIMITED</p>
                        <p className="space-x-5"><span>Director: Sachin Kumar</span><span>GSTIN: JBDU3YY8887</span></p></div>
                </div>
                <div className="tracking-tight md:tracking-normal text-center mt-3 lg:mt-0">Company's Registered Address : Choura Road, Chas, P.O- Narayanpur, P.S-Pindrajora, City - Bokaro Steel City, 827013, Jharkhand, INDIA.</div>
            </div>
            {
                <DialogBox
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    className="w-[32vw] bg-white rounded-xl flex flex-col overflow-hidden"
                    parentDivClassName="flex justify-center items-center"
                >
                    <h2 className="text-center text-xl font-bold border-b border-[rgb(8,43,61,0.4)] p-4 flex gap-1 justify-center items-center bg-slate-100 ">
                        🌌 Write Your Review of the LXS Universe 🛸
                    </h2>
                    <p className="px-10 text-sm leading-4 pt-5 italic">"Tell us about your journey through the LXS website — what stood out, what felt smooth, and how the experience was overall. Also, rate your visit from 1 to 5 stars to help guide future explorers across the galaxy ⭐"</p>
                    <form autoComplete="off" className="px-10 space-y-4 py-5 text-sm font-semibold">
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="h-9 rounded-full w-full px-4 border border-[rgb(8,43,61)] outline-none" />
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="h-9 rounded-full w-full px-4 border border-[rgb(8,43,61)] outline-none" />
                        <textarea type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Write Website Review" className="h-32 rounded-xl w-full px-4 py-2 border border-[rgb(8,43,61)] outline-none" ></textarea>
                    </form>
                    <div className="flex justify-between items-center px-10 mb-7">
                        <div className="flex justify-between gap-1 mr-2">
                            {
                                [1, 2, 3, 4, 5].map((item, index) => (
                                    <img key={index} src={item <= formData.rating ? starIconFill : starIconStroke} alt="" className="h-9 cursor-pointer" onClick={(e) => { e.preventDefault(), setFormData({ ...formData, rating: item }) }} />
                                ))
                            }
                        </div>
                        <div className="space-x-2">
                            <button
                                className="border-2 font-semibold border-[rgb(8,43,61)] h-9 w-[82px] rounded-full lg:hover:bg-[rgb(8,43,61)] lg:hover:text-white"
                                onClick={handleCancelButton}
                            >
                                Cancel
                            </button>
                            <button
                                className="h-9 w-[82px] rounded-full font-semibold bg-gradient-to-r from-[rgb(248,181,44)] to-[rgb(240,85,120)] text-white lg:hover:shadow-[0px_0px_10px_-3px_rgb(8,43,61)]"
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </DialogBox>
            }
        </>
    )
}

export default Footer
