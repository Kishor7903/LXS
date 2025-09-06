import { Link } from "react-router-dom"
import facebookLogo from "../assets/Socials/Facebook.png"
import instagramLogo from "../assets/Socials/Instagram.png"
import twitterLogo from "../assets/Socials/Twitter.png"
import youtubeLogo from "../assets/Socials/Youtube.png"
import linkedinLogo from "../assets/Socials/Linkedin.png"
import whatsappLogo from "../assets/Socials/Whatsapp.png"
import LxsLogo from "../assets/commonIcons/Website Logo (TM) with tagline.png"
import playStoreImg from "../assets/commonIcons/Playstore 3.png"
import appStoreImg from "../assets/commonIcons/App Store 3.png"
import { useEffect, useState } from "react"
import DialogBox from "./DialogBox"
import starIconStroke from "../assets/commonIcons/Rewards 2 (Stroke).png"
import starIconFill from "../assets/commonIcons/Rewards 2 (Fill).png"
import { addWebsiteReview } from "@/firebase/auth"
import { useToast } from "./ToastProvider"
import { useSelector } from "react-redux"

let menu = [
    {
        "title": "Explore the Universe",
        "menus": [
            {
                "name": "All Blogs",
                "slug": "/all-blogs"
            },
            {
                "name": "LUPIN (Story)",
                "slug": "/blog/NhgkYJnelw2hVIv8LCgt"
            },
            {
                "name": "Customers Review",
                "slug": "/about-us#global-ratings"
            },
            // {
            //     "name": "LXS Crew Membership",
            //     "slug": "/subscription"
            // },
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
            {
                "name": "Track Your Shipment",
                "slug": "/orders/track-orders"
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
    let { user } = useSelector(state => state.auth);
    let [formData, setFormData] = useState({
        name: "",
        email: "",
        description: "",
        rating: 0
    })
    let date = new Date();
    const toast = useToast();

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
        if (!formData.name || !formData.description || !formData.email || formData.rating === 0) {
            toast("Required all fields !");
            return
        }

        addWebsiteReview({ ...formData, userId: user ? user.id : null }).then(() => {
            toast("Reviewed Successfully");
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
                            <Link to="https://www.instagram.com/lxslifestylestore" target="_blank"><img src={instagramLogo} alt="" className='h-6 lg:h-9 cursor-pointer lg:hover:scale-[1.1] lg:active:scale-[1] duration-200' /></Link>
                            <Link to="https://www.linkedin.com/company/lxslifestylestore" target="_blank"><img src={linkedinLogo} alt="" className='h-6 lg:h-9 cursor-pointer lg:hover:scale-[1.1] lg:active:scale-[1] duration-200' /></Link>
                            <Link to="https://www.x.com/lxs_store" target="_blank"><img src={twitterLogo} alt="" className='h-6 lg:h-9 cursor-pointer lg:hover:scale-[1.1] lg:active:scale-[1] duration-200' /></Link>
                            <Link to="https://www.youtube.com/channel/UCGA1Te3h14lK5ePC-LGD3pg?sub_confirmation=1" target="_blank"><img src={youtubeLogo} alt="" className='h-6 lg:h-9 cursor-pointer lg:hover:scale-[1.1] lg:active:scale-[1] duration-200' /></Link>
                            <Link onClick={handleSendWhatsApp} target="_blank"><img src={whatsappLogo} alt="" className='h-6 lg:h-9 cursor-pointer lg:hover:scale-[1.1] lg:active:scale-[1] duration-200' /></Link>
                            <Link to="https://www.facebook.com/lxslifestylestore" target="_blank"><img src={facebookLogo} alt="" className='h-6 lg:h-9 cursor-pointer lg:hover:scale-[1.1] lg:active:scale-[1] duration-200' /></Link>
                        </div>
                    </div>
                    <div className="flex gap-6 ">
                        <div className="w-44 py-2 rounded-xl px-[14px] flex items-center gap-2 cursor-pointer lg:hover:scale-[1.05] bg-slate-100 border border-slate-300 shadow-md lg:active:scale-[0.98] duration-200">
                            <img src={playStoreImg} alt="" className="h-9" />
                            <div className="flex flex-col justify-center items-start h-10">
                                <p className="text-[11px] font-medium">ADDING SOON ON</p>
                                <p className="text-base font-semibold leading-4">Play Store</p>
                            </div>
                        </div>
                        <div className="w-44 py-2 rounded-xl px-[14px] flex items-center gap-2 cursor-pointer lg:hover:scale-[1.05] bg-slate-100 border border-slate-300 shadow-md lg:active:scale-[0.98] duration-200">
                            <img src={appStoreImg} alt="" className="h-9" />
                            <div className="flex flex-col justify-center items-start h-10">
                                <p className="text-[11px] font-medium">ADDING SOON ON</p>
                                <p className="text-base font-semibold leading-4">App Store</p>
                            </div>
                        </div>


                    </div>

                </div>
                <div className="w-[52%] flex justify-between 2xl:px-8 px-5 text-xs">
                    {
                        menu.map((item, index) => {
                            return (
                                <div key={index} className="text-center w-56">
                                    <h3 className='font-bold h-10 mb-1 flex justify-center text-sm md:text-[16px] lg:text-xl leading-[1.1] tracking-tight'>{item.title}</h3>
                                    <div className="flex flex-col items-center text-[10px] md:text-xs lg:text-sm md:gap-1 tracking-tighter">
                                        {
                                            item.menus.map((link, idx) => (
                                                <Link key={idx} to={link.slug} className='active:underline font-medium h-[14px] active:font-semibold lg:hover:font-semibold'>{link.name}</Link>
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
                    <div className="text-slate-400 text-left w-[35%]"><p>Don't test me, I'm watching 👁👁</p><p>Copyright &copy; {date.getFullYear()} LXS Lifestyle Store - All Trademark & Rights Reserved</p><p>Peek at our Secrets <Link to="/setting/privacy-data" className="font-medium text-slate-300 lg:hover:underline active:underline ml-1 text-xs">View</Link></p></div>
                    <button className="text-white px-3 flex justify-center items-center gap-1 h-10 rounded-xl border border-white lg:hover:bg-white lg:hover:text-[rgb(8,43,61)] font-medium" onClick={(e) => { e.preventDefault(), setIsOpen(true) }} onMouseEnter={() => setIsHovered(true)} onMouseOut={() => setIsHovered(false)}><i className='fi fi-sr-file-edit relative top-[1px]'></i> Write Website Review</button>
                    <div className="text-slate-400 text-right w-[35%]"><p>Attention, Earthlings! This starship—uhh, I mean</p><p>This website - is officially Operated by LXSLIFESTYLESTORE (OPC) PRIVATE LIMITED</p>
                        <p className="space-x-5"><span>Director: Sachin Kumar</span><span>GSTIN: 20AAGCL3501L1ZW</span></p></div>
                </div>
                <div className="tracking-tight md:tracking-normal text-center mt-3 lg:mt-0">Company's Registered Address : Choura Road, Chas, P.O- Narayanpur, P.S-Pindrajora, City - Bokaro Steel City, 827013, Jharkhand, INDIA.</div>
            </div>
            {
                <DialogBox
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    className="w-[38vw] bg-white rounded-3xl flex flex-col items-center py-6 px-10 overflow-hidden"
                    parentDivClassName="flex justify-center items-center"
                >
                    <h2 className="text-center text-2xl rounded-2xl font-bold border-b border-slate-300 shadow-md uppercase p-4 flex gap-1 justify-center items-center bg-[rgb(8,43,61)] text-white w-96">
                        Rate the LXS Universe 🛸
                    </h2>
                    <p className="text-sm leading-4 pt-5 italic">"Tell us about your journey through the LXS Website — what stood out, what felt smooth, and how the experience was overall. <br /> Also, rate your visit from 1 to 5 stars to help guide future explorers across the galaxy ⭐"</p>
                    <form autoComplete="off" className="space-y-5 py-5 text-sm font-medium w-full">
                        <div className="flex gap-5">
                            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="h-9 rounded-xl w-full px-4 border border-slate-300 shadow-md outline-none" />
                            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="h-9 rounded-xl w-full px-4 border border-slate-300 shadow-md outline-none" />
                        </div>
                        <textarea type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Write Website Review" className="h-32 rounded-xl w-full px-4 py-2 border border-slate-300 shadow-md outline-none" ></textarea>
                    </form>
                    <div className="flex justify-between items-center w-full">
                        <div className="flex justify-between gap-2 mr-2">
                            {
                                [1, 2, 3, 4, 5].map((item, index) => (
                                    <img key={index} src={item <= formData.rating ? starIconFill : starIconStroke} alt="" className="h-10 cursor-pointer" onClick={(e) => { e.preventDefault(), setFormData({ ...formData, rating: item }) }} />
                                ))
                            }
                        </div>
                        <div className="space-x-4">
                            <button
                                className="border-2 font-semibold border-[rgb(8,43,61)] h-10 px-5 rounded-xl lg:hover:bg-[rgb(8,43,61)] lg:hover:text-white lg:hover:scale-[1.08] duration-200 lg:active:scale-[0.97]"
                                onClick={handleCancelButton}
                            >
                                Cancel
                            </button>
                            <button
                                className="h-10 px-5 rounded-xl lg:hover:scale-[1.08] duration-200 lg:active:scale-[0.97] font-semibold bg-gradient-to-r from-[rgb(248,181,44)] to-[rgb(253,84,120)] text-white"
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
