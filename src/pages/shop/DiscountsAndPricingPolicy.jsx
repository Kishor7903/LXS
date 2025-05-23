import BulletPointsWithHeading from "@/components/BulletPointsWithHeading";
import HeadingText from "@/components/HeadingText";
import { useState } from "react";

function DiscountsAndPricingPolicy() {
    const [openIndex, setOpenIndex] = useState(-1);

    const toggleSection = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    const sections = [
        {
            title: '1. Pricing Policy',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Transparent & Competitive Pricing:"
                        points={
                            [
                                "All product prices are clearly displayed on the website.",
                                "Prices are determined based on market trends, supplier costs, and promotional campaigns.",
                                "Prices are listed in [Currency: INR/USD/Other], including/excluding applicable taxes (as specified).",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Dynamic Pricing Adjustments:"
                        points={
                            [
                                "Prices may change based on demand, supplier costs, or promotional discounts.",
                                "LXS Store reserves the right to modify prices at any time without prior notice.",
                                "Users are charged the price displayed at the time of purchase—we do not offer price matching or refunds for price drops after purchase.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Taxes & Additional Charges:"
                        points={
                            [
                                "Prices may be subject to local taxes, VAT, GST, or other applicable charges based on customer location.",
                                "Shipping charges, if applicable, are calculated separately at checkout.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '2. Discounts & Promotions Policy',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Types of Discounts Offered:"
                        points={
                            [
                                "Flat Discounts – Direct price reduction on selected products.",
                                "Percentage-Based Discounts – Discounts such as 10% OFF, 20% OFF, etc.",
                                "Coupon Code Discounts – Customers can apply discount codes at checkout.",
                                "Bulk Order Discounts – Special pricing for large quantity purchases.",
                                "Seasonal & Festive Discounts – Offers during holidays or special events.",
                                "New Customer Discounts – Exclusive discounts for first-time buyers.",
                                "Loyalty & Rewards Discounts – Customers can redeem LXS Points for additional savings.",
                                "Referral Discounts – Users earn discount rewards by referring friends.",
                                "Limited-Time Offers – Special promotions valid for a short period.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Discount Code & Coupon Usage:"
                        points={
                            [
                                "Only one discount code can be applied per order.",
                                "Some discount codes are applicable only on specific products or categories.",
                                "Coupons have an expiration date and cannot be used after they expire.",
                                "Discount codes cannot be exchanged for cash.",
                                "LXS Store reserves the right to decline coupons if fraudulent activity is detected.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Bulk Order Discounts & Custom Pricing:"
                        points={
                            [
                                "Customers placing bulk orders may request custom pricing.",
                                "Bulk discounts depend on quantity, product type, and stock availability.",
                                "To request bulk pricing, contact [Insert Support Email] or use the Bulk Order Request Form on our website.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '3. Special Pricing for Sellers & Artists',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Seller Pricing & Discounts:"
                        points={
                            [
                                "Sellers can set their own base prices for products listed on LXS Store.",
                                "LXS Store may offer platform-wide discounts on eligible products.",
                                "Discounts applied by LXS Store will not affect the seller’s base earnings unless agreed upon.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Art Marketplace Pricing:"
                        points={
                            [
                                "Artists can set their own prices for artwork.",
                                "Discounts on artwork can be set by the artist or through platform-wide promotions.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '4. Influencer & Affiliate Discounts',
            content: (
                <>
                    <BulletPointsWithHeading
                        points={
                            [
                                "Influencers working with LXS Store may receive exclusive discount codes for their audience.",
                                "Affiliate commissions may apply based on sales generated through referral links.",
                                "Influencer discount codes cannot be misused for personal purchases.",
                            ]
                        }
                    />

                </>
            )
        },
        {
            title: '5. Restrictions & Misuse of Discounts',
            content: (
                <>
                    <BulletPointsWithHeading
                        points={
                            [
                                "Discounts cannot be combined with other promotions unless specified.",
                                "Users cannot resell discounted products at higher prices.",
                                "Abuse of discount codes (e.g., using multiple fake accounts) may lead to account suspension.",
                                "LXS Store reserves the right to cancel orders that exploit pricing errors or fraudulent discounts.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '6. Price Errors & Corrections',
            content: (
                <>
                    <p className="mb-2">
                        In case of incorrect pricing due to system errors, LXS Store reserves the right to:
                    </p>

                    <BulletPointsWithHeading
                        points={
                            [
                                "Cancel affected orders and provide refunds.",
                                "Notify customers of price changes before processing orders.",
                                "If a product is mistakenly priced at ₹0 or extremely low due to an error, orders will be cancelled.",
                            ]
                        }
                    />

                </>
            )
        },
        {
            title: '7. Modifications to Pricing & Discounts',
            content: (
                <>
                    <BulletPointsWithHeading
                        points={
                            [
                                "LXS Store reserves the right to change, update, or discontinue discounts, promotions, and pricing at any time.",
                                "Users will be informed of major price changes via email, SMS, or website notifications.",
                            ]
                        }
                    />

                    <p className="mt-5">
                        This Discounts & Pricing Policy ensures transparency and fairness for all customers, sellers, artists, and
                        influencers on LXS Store.
                    </p>
                </>
            )
        }
    ];
    return (
        <div className="w-full mx-auto px-20 py-5">
            <HeadingText name="Discounts & Pricings Policy" className="text-[40px]" />
            <p className="text-lg font-medium mb-4">Updated: 22.06.2025</p>
            <p className="mb-4 text-lg leading-6 w-3/4">
                At LXS Store, we strive to offer transparent, competitive, and fair pricing to our customers while providing
                exciting discounts and promotional offers. This policy explains how pricing, discounts, and promotions work
                on our platform.
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

export default DiscountsAndPricingPolicy
