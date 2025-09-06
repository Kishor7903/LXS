import { Link } from "react-router-dom";


function PrivacyData() {

    const privacyData = [
        {
            name: "Registrations & Certifications",
            content: [
                {
                    key: "⁠MSME / Udyam Registration Certificate:",
                    value: "View",
                    slug: "#"
                },
            {
                    key: "⁠Startup India / DPIIT Recognition Certificate:",
                    value: "View",
                    slug: "#"
                },
                {
                    key: "⁠DLT Registration Certificate:",
                    value: "View",
                    slug: "#"
                },
                {
                    key: "⁠Trademark Registration Certificate:",
                    value: "View",
                    slug: "#"
                },
            ],
        },
        {
            name: "Core Legal & Compilance",
            content: [
                {
                    key: "Privacy Policy:",
                    value: "view",
                    slug: "/policy/privacy-policy"
                },
                {
                    key: "Cookies & Tracking Policy:",
                    value: "view",
                    slug: "/policy/cookie-and-tracking-policy"
                },
                {
                    key: "Terms & Conditions:",
                    value: "view",
                    slug: "/policy/terms-and-conditions"
                },
                {
                    key: "Limitation of Liability & Disclaimer Policy:",
                    value: "view",
                    slug: "/policy/limitation-of-liability-and-disclaimer-policy"
                },
                {
                    key: "Intellectual Property Policy:",
                    value: "view",
                    slug: "/policy/intellectual-property-policy"
                },
                {
                    key: "Age & Eligibility Policy:",
                    value: "view",
                    slug: "/policy/age-and-eligibility-policy"
                },
                {
                    key: "Legal Compliances Policy:",
                    value: "view",
                    slug: "/policy/legal-compliance"
                },
                {
                    key: "Third-Party Service Provider Policy:",
                    value: "view",
                    slug: "/policy/third-party-service-provider-policy"
                },
            ],
        },
        {
            name: "Shopping, Payments & Orders",
            content: [
                {
                    key: "General Shopping Policy:",
                    value: "view",
                    slug: "/policy/general-shopping-policy"
                },
                {
                    key: "Payments & Checkout Policy:",
                    value: "view",
                    slug: "/policy/payments-and-checkout-policy"
                },
                {
                    key: "Discount & Pricing Policy:",
                    value: "view",
                    slug: "/policy/discounts-and-pricing-policy"
                },
                {
                    key: "Loyalty & Rewards Program Policy:",
                    value: "view",
                    slug: "/policy/loyalty-and-reward-program"
                },
            ],
        },
        {
            name: "Shipping, Returns & Cancelletions",
            content: [
                {
                    key: "Shipping & Delivery Policy:",
                    value: "view",
                    slug: "/policy/shipping-and-delivery-policy"
                },
                {
                    key: "Return & Refund Policy:",
                    value: "view",
                    slug: "/policy/return-and-refund-policy"
                },
                {
                    key: "Exchange & Replacement Policy:",
                    value: "view",
                    slug: "/policy/exchange-and-replacemennt-policy"
                },
                {
                    key: "Order Cancellation Policy:",
                    value: "view",
                    slug: "/policy/order-cancellation-policy"
                },
            ],
        },
        {
            name: "Customer Support & Disputes",
            content: [
                {
                    key: "Customer Support & Complaint Resolution Policy:",
                    value: "view",
                    slug: "/policy/custumer-support-and-resolution-policy"
                },
                {
                    key: "Customer Support & Dispute Resolution Policy:",
                    value: "view",
                    slug: "/policy/custumer-support-and-dispute-resolution-policy"
                },
                {
                    key: "FAQS:",
                    value: "view",
                    slug: "/policy/FAQs"
                },
            ],
        },
        {
            name: "Community & Responsibility",
            content: [
                
                // {
                //     key: "Affiliate & Influencer Policy:",
                //     value: "view",
                //     slug: "/policy/affiliate-and-influencer-policy"
                // },
                
                {
                    key: "Community Guidelines & User-Generated Content Policy:",
                    value: "view",
                    slug: "/policy/community-guidelines"
                },
                {
                    key: "Enviromental & Ethical Sourcing Policy:",
                    value: "view",
                    slug: "/policy/enviromental-ethical-sourcing-policy"
                },
                {
                    key: "Intergalactic Framework Policy:",
                    value: "view",
                    slug: "/policy/intergalactic-framework-policy"
                },
                
            ],
        },
        // {
        //     name: "Account Management",
        //     content: [
        //         {
        //             key: "delete account:",
        //             value: "Request account deletion",
        //             slug: ""
        //         },
        //     ],
        // },
        {
            name: "Confidential Data",
            content: [
                {
                    key: "Hidden Orders:",
                    value: "View",
                    slug: "/setting/hidden-orders"
                },
            ],
        },
    ];


    return (
        <div className="w-full h-full pl-5 flex gap-5 ">
            <div className="w-[60%] flex flex-col justify-between">
            <div className="leading-[1] font-semibold h-10">The Codex 📘<br />
                <p className="text-xs font-normal">Explore the policies, permissions, and principles behind the galaxy</p>
            </div>
            <div className="space-y-3 h-full py-2 px-2 overflow-y-scroll no-scrollbar">
            {
                privacyData.map((items,index) => (
                    <div key={index} className="border border-slate-300 bg-slate-100 shadow-md px-4 pt-2 pb-4 rounded-xl">
                        <h3 className="font-bold tracking-wide text-lg capitalize">{items.name}</h3>
                        <div className="space-y-1 text-xs leading-3 mt-2 flex flex-col gap-1 font-medium ml-3">
                            {items.content.map((item,idx) => (
                                <div key={idx} className="">
                                    <span key={idx} className="mr-3 ">{item.key}</span>
                                    <Link to={item.slug} className="capitalize text-[rgb(253,84,120)] font-medium lg:hover:underline">{item.value}</Link>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
            <div className="border w-[40%] h-full rounded-3xl shadow-[inset_0px_0px_10px_-1px_rgb(8,43,61)]"></div>
        </div>
    )
}

export default PrivacyData
