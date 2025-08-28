import { Link } from "react-router-dom";


function PrivacyData() {

    const privacyData = [
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
        {
            name: "Legal & compliances",
            content: [
                {
                    key: "privacy policy:",
                    value: "view",
                    slug: "/policy/privacy-policy"
                },
                {
                    key: "Terms & Conditions:",
                    value: "view",
                    slug: "/policy/terms-and-conditions"
                },
                {
                    key: "FAQS:",
                    value: "view",
                    slug: "/policy/FAQs"
                },
                {
                    key: "return & refund policy:",
                    value: "view",
                    slug: "/policy/return-and-refund-policy"
                },
                {
                    key: "exchange & replacement policy:",
                    value: "view",
                    slug: "/policy/exchange-and-replacemennt-policy"
                },
                {
                    key: "shipping & delivery policy:",
                    value: "view",
                    slug: "/policy/shipping-and-delivery-policy"
                },
                {
                    key: "payments & checkout policy:",
                    value: "view",
                    slug: "/policy/payments-and-checkout-policy"
                },
                {
                    key: "order cncelletion policy:",
                    value: "view",
                    slug: "/policy/order-cancellation-policy"
                },
                {
                    key: "intellectual property policy:",
                    value: "view",
                    slug: "/policy/intellectual-property-policy"
                },
                {
                    key: "customer support & complaint resolution policy:",
                    value: "view",
                    slug: "/policy/custumer-support-and-resolution-policy"
                },
                {
                    key: "loyalty & rewards program policy:",
                    value: "view",
                    slug: "/policy/loyalty-and-reward-program"
                },
                {
                    key: "community guidelines & user-Generated content policy:",
                    value: "view",
                    slug: "/policy/community-guidelines"
                },
                {
                    key: "discount & pricing Policy:",
                    value: "view",
                    slug: "/policy/discounts-and-pricing-policy"
                },
                {
                    key: "Affiliate & influencer policy:",
                    value: "view",
                    slug: "/policy/affiliate-and-influencer-policy"
                },
                {
                    key: "enviromental & ethical sourcing policy:",
                    value: "view",
                    slug: "/policy/enviromental-ethical-sourcing-policy"
                },
                {
                    key: "legal compliances policy:",
                    value: "view",
                    slug: "/policy/legal-compliance"
                },
                {
                    key: "general shopping policy:",
                    value: "view",
                    slug: "/policy/general-shopping-policy"
                },
                {
                    key: "customer support & dispute resolution policy:",
                    value: "view",
                    slug: "/policy/custumer-support-and-dispute-resolution-policy"
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
                                    <span key={idx} className="capitalize mr-3 ">{item.key}</span>
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
