import { Link } from "react-router-dom"
import facebookLogo from "../assets/Socials /Facebook.png"
import instagramLogo from "../assets/Socials /Instagram.png"
import twitterLogo from "../assets/Socials /Twitter.png"
import youtubeLogo from "../assets/Socials /Youtube.png"
import linkedinLogo from "../assets/Socials /Linkedin.png"
import whatsappLogo from "../assets/Socials /Whatsapp (Fill).png"
import LxsLogo from "../assets/commonIcons/Website Logo (TM).png"


function Footer() {

    const handleSendWhatsApp = () => {
        const url = `https://wa.me/${+918987888368}`;
        window.open(url, '_blank');
      };


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
                <div className="flex flex-col lg:w-full lg:flex-row gap-2 lg:gap-20 mx-auto lg:px-10">
                    <div className="text-gray-400 order-2 lg:order-1 lg:w-1/2 text-center">Copyright &copy; 2025 LXS Lifestyle Store - All Rights Reserved</div>
                    <div className="text-gray-400 lg:w-1/2 text-center lg:order-2">Powered by LXS Lifestyle Store, India.</div>
                </div>
                <div className="tracking-tight md:tracking-normal text-center mt-3 lg:mt-0">Company's Registered Address : Choura Road, Chas, P.O- Narayanpur, P.S-Pindrajora, City - Bokaro Steel City, 827013, Jharkhand, INDIA.</div>
            </div>
        </>
    )
}

export default Footer
