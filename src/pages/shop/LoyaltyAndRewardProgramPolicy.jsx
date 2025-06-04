import BulletPointsWithHeading from "@/components/BulletPointsWithHeading";
import HeadingText from "@/components/HeadingText";
import { useState } from "react";

function LoyaltyAndRewardProgramPolicy() {
    const [openIndex, setOpenIndex] = useState(-1);

    const toggleSection = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    const sections = [
        {
            title: '1. Enrollment & Eligibility',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Who Can Join?"
                        points={
                            [
                                "The LXS Rewards Program is open to all registered customers of LXS Store.",
                                "Customers must have an active LXS Store account to earn and redeem points.",
                                "Participation is free of charge—no subscription or fees required.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="How to Sign Up?"
                        points={
                            [
                                "Customers are automatically enrolled when they create an account on LXS Store.",
                                "Points start accumulating from the first purchase after enrollment.",
                            ]
                        }
                    />

                </>
            )
        },
        {
            title: '2. How to Earn LXS Rewards Points?',
            content: (
                <>
                    <ul className="list-disc list-inside space-y-1 leading-5 pl-14 -indent-[22px] w-[54%]">
                        <li><span>Activity</span> <span className="float-end">LXS Points Earned</span></li>
                        <li><span className="mr-5">Sign Up Bonus </span> <span className="float-end">100 Points (One-time)</span></li>
                        <li><span className="mr-5">Every ₹100 Spent</span> <span className="float-end">10 Points</span></li>
                        <li><span className="mr-5">Referring a Friend </span> <span className="float-end">200 Points (Upon friend's first purchase)</span></li>
                        <li><span className="mr-5">Writing a Product Review</span><span className="float-end">50 Points</span></li>
                        <li><span className="mr-5">Following LXS Store on Social Media </span><span className="float-end">30 Points per platform</span></li>
                        <li>Special Events & Promotions Varies</li>
                        <li>LXS Points are automatically credited within 24-48 hours after the qualifying action.</li>
                        <li>Referral points are credited only when the referred friend makes a purchase.</li>
                    </ul>
                </>
            )
        },
        {
            title: '3. How to Redeem LXS Rewards Points?',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Redemption Options:"
                        points={
                            [
                                "₹1 Discount for Every 10 Points",
                                "Use points for exclusive discounts on purchases.",
                                "Redeem points for free shipping on eligible orders.",
                                "Unlock special gifts, exclusive products, or early access to sales.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Minimum Points for Redemption:"
                        points={
                            [
                                "Customers must have at least 500 LXS Points to redeem.",
                                "Maximum redemption per order: Up to 50% of the total order value.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="EHow to Use Points at Checkout?"
                        points={
                            [
                                "During checkout, select “Apply LXS Points” to use available rewards.",
                                "The discount will be applied instantly to the final total.",
                            ]
                        }
                    />

                </>
            )
        },
        {
            title: '4. Reward Points Expiration & Limitations',
            content: (
                <>
                    <BulletPointsWithHeading
                        points={
                            [
                                "LXS Points expire after 12 months from the date they are earned.",
                                "Expired points cannot be reinstated or transferred.",
                                "Reward points are non-transferable and cannot be exchanged for cash.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '5. Special Membership Tiers & Benefits',
            content: (
                <>
                    <ul className="list-disc list-inside space-y-1 leading-5 pl-14 -indent-[22px] w-[63%]">
                        <li><span>Tier</span> <span className="float-end">Required Points Exclusive Perks</span></li>
                        <li><span className="mr-5">Silver </span> <span className="float-end">0 - 999 Points Standard Discounts & Offers</span></li>
                        <li><span className="mr-5">Gold</span> <span className="float-end">1000 - 4999 Points Extra 5% Discount on Every Order</span></li>
                        <li><span className="mr-5">Platinum </span> <span className="float-end">5000+ Points Free Shipping, Early Access to Sales, Birthday Rewards</span></li>
                    </ul>
                </>
            )
        },
        {
            title: "6. Fraud Prevention & Abuse Policyg",
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="To maintain fairness, LXS Store strictly prohibits fraudulent activity, including:"
                        points={
                            [
                                "Creating fake accounts to earn points.",
                                "Abuse of referral programs (e.g., referring yourself).",
                                "Returning products after redeeming points to exploit rewards.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Customers found violating these rules may:"
                        points={
                            [
                                "Have their points forfeited.",
                                "Be permanently banned from the Loyalty Program.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '7. Modifications & Program Termination',
            content: (
                <>
                    <BulletPointsWithHeading
                        points={
                            [
                                "LXS Store reserves the right to change the reward structure, modify, or discontinue the program at any time.",
                                "Any changes will be updated in this policy and communicated via email.",
                            ]
                        }
                    />

                </>
            )
        },
        {
            title: '8. Contact & Support',
            content: (
                <>
                    <p className="mb-2">
                        For any questions related to the LXS Rewards Program, contact:
                    </p>

                    <ul className="list-disc list-inside space-y-1 leading-5 pl-14 -indent-[22px]">
                        <li><i className="fi fi-rr-envelope relative top-[2px]"></i> Email: [Insert support email]"</li>
                        <li><i className="fi fi-rr-phone-call relative top-[2px]"></i> Phone: [Insert contact number]"</li>
                        <li><i className="fi fi-rs-comment relative top-[2px]"></i> Live Chat: Available from [X:XX AM – X:XX PM]"</li>
                    </ul>

                    <p className="mt-5">
                        This Loyalty & Rewards Program Policy ensures a seamless and exciting rewards experience for our
                        customers! Earn points, unlock benefits, and enjoy shopping at LXS Store!
                    </p>
                </>
            )
        },
    ];

    return (
        <div className="w-full mx-auto px-20 py-5">
            <HeadingText name="Loyalty & Rewards Program Policy" className="text-[40px]" />
            <p className="text-lg font-medium mb-4">Updated: 22.06.2025</p>
            <p className="mb-4 text-lg leading-6 w-3/4">
                At LXS Store, we value our customers and want to reward them for their loyalty! Our LXS Rewards & Loyalty
                Program allows customers to earn points on purchases, referrals, and special activities, which can be
                redeemed for discounts, free products, and exclusive perks.
            </p>
            {sections.map((section, index) => (
                <div key={index} className={`mb-2 border overflow-hidden w-[98%] mx-auto ${openIndex === index ? "rounded-3xl" : "rounded-full"}`}>
                    <button
                        className={`w-full flex justify-between items-center text-left font-semibold px-7 py-3 text-xl ${openIndex === index ? 'bg-[#f7f7f7] text-[#ef4d5a]' : 'bg-gray-100'
                            }`}
                        onClick={() => toggleSection(index)}
                    >
                        {section.title}
                        {openIndex !== index ? <i className="fi fi-br-angle-right relative top-1"></i> : <i className="fi fi-br-angle-down relative top-1"></i>}
                    </button>
                    {openIndex === index && section.content && (
                        <div className="px-10 py-4 bg-white border-t">{section.content}</div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default LoyaltyAndRewardProgramPolicy
