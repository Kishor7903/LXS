import { Link } from "react-router-dom"
import facebookLogo from "../assets/Socials/Facebook.png"
import instagramLogo from "../assets/Socials/Instagram.png"
import twitterLogo from "../assets/Socials/Twitter.png"
import youtubeLogo from "../assets/Socials/Youtube.png"
import linkedinLogo from "../assets/Socials/Linkedin.png"
import whatsappLogo from "../assets/Socials/Whatsapp (Fill).png"
import LxsLogo from "../assets/commonIcons/Website Logo (TM).png"
import { useState } from "react"
import DialogBox from "./DialogBox"
import starIconStroke from "../assets/commonIcons/Rewards 2 (Stroke).png"
import starIconFill from "../assets/commonIcons/Rewards 2 (Fill).png"

let menu = [
    {
        "title": "Useful Links",
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
                "name": "FAQs",
                "slug": "/policy/FAQs"
            },
            {
                "name": "About Us",
                "slug": "/about-us"
            },
            {
                "name": "LXS Subscription",
                "slug": "#"
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
    let [rating, setRating] = useState(0);
    let [formData, setFormData] = useState({
        name: "",
        email: "",
        description: "",
        rating: 0
    })

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

        if (!formData.name || !formData.gender || !formData.DOB) {
            toast.error("Required All Fields!!")
            return
        }

        if (formData.altPhone) {
            if (formData.altPhone.length > 10 || formData.altPhone.length < 10) {
                toast.error("Alternate Phone Number is Invalid ...");
                return
            }
        }

        editUserDetails(formData).then(() => {
            dispatch(updateUserInfo(formData));
            setFormData(formData);
            setIsOpen(false);
            toast.success("User Updated Successfully...")
        })
    }


    return (
        <>
            <div className="w-full min-h-44 overflow-hidden py-6 lg:px-16 flex flex-col md:flex-row justify-between gap-y-8 border-t bg-white rounded-b-[30px] xl:rounded-b-[50px]">
                <div className="w-3/12 px-5 relative rounded">
                    <img src={LxsLogo} alt="" className="h-40" />
                </div>
                <div className="w-4/12">
                    <span className="text-xl font-bold ">LXS (OPC) PRIVATE LIMITED</span>
                    <p className="font-medium text-sm">Director: Sachin Kumar</p>
                    <p className="font-medium text-sm">GSTIN: JBDU3YY8887</p>
                    <h5 className='text-[rgb(8,43,61)] font-semibold text-center lg:text-left text-xs lg:text-xl pl-[2px] mt-5'>Connect With Our Socials!</h5>
                    <div className="flex gap-4 lg:gap-8 mt-2">
                        <Link to="https://www.instagram.com/lxslifestylestore" target="_blank"><img src={instagramLogo} alt="" className='h-6 lg:h-9 cursor-pointer' /></Link>
                        <Link to="https://www.linkedin.com/company/lxslifestylestore" target="_blank"><img src={linkedinLogo} alt="" className='h-6 lg:h-9 cursor-pointer' /></Link>
                        <Link to="https://www.x.com/lxs_store" target="_blank"><img src={twitterLogo} alt="" className='h-6 lg:h-9 cursor-pointer' /></Link>
                        <Link to="https://www.youtube.com/channel/UCGA1Te3h14lK5ePC-LGD3pg?sub_confirmation=1" target="_blank"><img src={youtubeLogo} alt="" className='h-6 lg:h-9 cursor-pointer' /></Link>
                        <Link onClick={handleSendWhatsApp} target="_blank"><img src={whatsappLogo} alt="" className='h-6 lg:h-9 cursor-pointer' /></Link>
                        <Link to="https://www.facebook.com/lxslifestylestore" target="_blank"><img src={facebookLogo} alt="" className='h-6 lg:h-9 cursor-pointer' /></Link>
                    </div>
                </div>
                <div className="w-5/12 flex justify-end gap-10 text-xs">
                    {
                        menu.map((item, index) => {
                            return (
                                <div key={index} className="text-center w-1/2">
                                    <h3 className='font-bold h-10 mb-1 flex justify-center text-sm md:text-[16px] lg:text-xl leading-[1.1]'>{item.title}</h3>
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
                <div className="flex flex-col items-center justify-between lg:w-full lg:flex-row gap-2 lg:gap-20 mx-auto lg:px-40">
                    <div className="text-gray-400 text-center w-[35%]">Copyright &copy; 2025 LXS Lifestyle Store - All Rights Reserved</div>
                    <button className="text-white px-3 flex justify-center items-center gap-1 h-10 rounded-full border border-white lg:hover:bg-white lg:hover:text-[rgb(8,43,61)] font-medium" onClick={(e) => { e.preventDefault(), setIsOpen(true) }} onMouseEnter={() => setIsHovered(true)} onMouseOut={() => setIsHovered(false)}><i className={`${isHovered ? "fi fi-sr-file-edit" : "fi fi-rr-file-edit"} relative top-[1px]`}></i> Write Website Review</button>
                    <div className="text-gray-400 text-center w-[35%]">Powered by LXS Lifestyle Store, India.</div>
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
                    <form autoComplete="off" className="px-10 space-y-4 py-5 text-sm">
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="h-9 rounded-full w-full px-4 border border-[rgb(8,43,61)] outline-none" />
                        <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="h-9 rounded-full w-full px-4 border border-[rgb(8,43,61)] outline-none" />
                        <textarea type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Write Website Review" className="h-32 rounded-xl w-full px-4 py-2 border border-[rgb(8,43,61)] outline-none" ></textarea>
                    </form>
                    <div className="flex justify-between px-10 mb-7">
                        <div className="flex justify-between gap-3">
                            {
                            [1, 2, 3, 4, 5].map((item, index) => (
                                <img key={index} src={item <= rating ? starIconFill : starIconStroke} alt="" className="h-9 cursor-pointer" onClick={() => setRating(item)} />
                            ))
                        }
                        </div>
                        <div className="space-x-4">
                            <button
                            className="border-2 font-semibold border-[rgb(8,43,61)] h-10 w-28 rounded-full lg:hover:bg-[rgb(8,43,61)] lg:hover:text-white"
                            onClick={handleCancelButton}
                        >
                            Cancel
                        </button>
                        <button
                            className="h-10 w-28 rounded-full font-semibold bg-gradient-to-r from-[rgb(248,181,44)] to-[rgb(240,85,120)] text-white lg:hover:shadow-[0px_0px_10px_-3px_rgb(8,43,61)]"
                            onClick={handleSubmit}
                        >
                            Apply
                        </button>
                        </div>
                    </div>
                </DialogBox>
            }
        </>
    )
}

export default Footer
