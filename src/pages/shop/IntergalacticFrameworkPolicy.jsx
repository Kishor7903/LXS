import BulletPointsWithHeading from "@/components/BulletPointsWithHeading";
import HeadingText from "@/components/HeadingText";
import { useState } from "react";


function IntergalacticFrameworkPolicy() {
    const [openIndex, setOpenIndex] = useState(-1);

    const toggleSection = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    const sections = [
        {
            title: '1. Cosmic User Guidelines (General Shopping & User Policy)',
            content: (
                <>
                    <BulletPointsWithHeading
                        points={
                            [
                                "At LXS Store, we aim to provide a hassle-free shopping experience for all customers. By using our platform, you agree to the following terms:"
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Eligibility for Shopping:"
                        points={
                            [
                                "Customers must be at least 18 years old or have parental consent to make a purchase.",
                                "By creating an account or making a purchase, you confirm that you are legally capable of entering into a contract.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Account Information & Security:"
                        points={
                            [
                                "You are responsible for providing accurate, current, and complete information when creating an account or placing an order.",
                                "You agree to maintain the confidentiality of your account login information and notify us of any unauthorized access or use.",
                                "LXS Store reserves the right to suspend or terminate accounts that violate our policies or engage in fraudulent activities."
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Acceptable Use:"
                        points={
                            [
                                "You may not use the platform for unlawful purposes or engage in behaviour that disrupts the operation of the site.",
                                "LXS Store reserves the right to restrict or block access to users who violate this policy.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '2. Stellar Pricing & Discounts Policy',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Price Transparency:"
                        points={
                            [
                                "Prices displayed on LXS Store are inclusive of taxes, unless otherwise specified on the product page.",
                                "The prices listed are in local currency and may be subject to change due to market fluctuations."
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Promo Codes & Discounts:"
                        points={
                            [
                                "Promo codes and discount offers are subject to specific terms and conditions, including expiration dates and minimum purchase requirements.",
                                "Discounts cannot be combined unless explicitly stated in the promotion.",
                                "Misuse of promo codes or fraudulent discount claims may result in order cancellations or account suspension."
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Loyalty & Reward Points:"
                        points={
                            [
                                "Customers can earn LXS Rewards points by making purchases, participating in special events, and interacting with the brand.",
                                "Loyalty points can be redeemed for discounts on future purchases. Points have an expiration date and will be forfeited after [X] months if not used."
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '3. Warp-Speed Payment & Checkout',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Payment Methods:"
                        points={
                            [
                                "We accept major credit/debit cards, PayPal, UPI, and other secure digital wallets.",
                                "Payments are processed securely through trusted payment gateways, ensuring your information is protected at all times."
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Payment Authorization:"
                        points={
                            [
                                "Your order will only be confirmed once payment authorization is successfully completed. If payment is declined or flagged as fraudulent, your order will be cancelled.",
                                "If a transaction fails, we will notify you to reattempt payment or choose an alternative payment method."
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Currency & Fees:"
                        points={
                            [
                                "All prices are quoted in local currencies and may be subject to foreign exchange rates for international transactions.",
                                "Additional fees such as taxes, import duties, or shipping charges may apply and will be calculated at checkout."
                            ]
                        }
                    />

                </>
            )
        },
        {
            title: '4. Intergalactic Shipping & Delivery Policy',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Order Processing:"
                        points={
                            [
                                "Orders are processed within 24-48 hours of receiving payment.",
                                "Shipping times vary based on the shipping method selected during checkout, and may take 3-10 business days depending on your location."
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Shipping & Handling Fees:"
                        points={
                            [
                                "Shipping costs are calculated at checkout and are based on the weight of the items and the destination.",
                                "Free shipping may apply on orders above a certain threshold as indicated on the website."
                            ]
                        }
                    />
                    <BulletPointsWithHeading
                        heading="Tracking & Delays:"
                        points={
                            [
                                "Once your order is shipped, a tracking number will be provided.",
                                "While we aim for timely delivery, delays due to factors like weather, customs, or unforeseen circumstances may occur."
                            ]
                        }
                    />

                </>
            )
        },
        {
            title: '5. Universal Order Cancellation Policy',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Order Cancellation by Customer:"
                        points={
                            [
                                "Customers can cancel an order before it has been shipped.",
                                "To cancel, contact us via email or live chat immediately.",
                                "Once the order is shipped, cancellation is not possible."
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Order Cancellation by LXS Store:"
                        points={
                            [
                                "LXS Store reserves the right to cancel orders due to stock unavailability, payment failures, or suspicious activity.",
                                "In case of cancellation by LXS Store, you will receive a full refund."
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '6. Multiverse Returns, Refunds & Exchanges',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Return Eligibility:"
                        points={
                            [
                                "Products must be returned within 14 days from the date of delivery.",
                                "Items must be unused, in original packaging, and in resellable condition to qualify for a return.",
                                "Certain products, such as personalized items or digital downloads, may not be eligible for return."
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Refund Process:"
                        points={
                            [
                                "Once a return is received and inspected, the refund will be processed within 5-7 business days.",
                                "Refunds will be issued to the original payment method used for the purchase."
                            ]
                        }
                    />
                    <BulletPointsWithHeading
                        heading="Exchange Policy:"
                        points={
                            [
                                "Customers can request an exchange for the same item in a different size or colour. Exchanges are subject to stock availability.",
                                "If the product is no longer available, a refund will be issued instead."
                            ]
                        }
                    />

                </>
            )
        },
        {
            title: '7. LXS Marketplace & Community Guidelines',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Seller Guidelines:"
                        points={
                            [
                                "Sellers must list products that are authentic, legally owned, and compliant with our policies.",
                                "Any violation of our marketplace rules may lead to suspension or removal of seller accounts."
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Artist & Influencer Guidelines:"
                        points={
                            [
                                "Artists and influencers must have the legal right to post, sell, or promote any content they upload to the platform.",
                                "Influencers must disclose sponsored content in accordance with applicable advertising guidelines."
                            ]
                        }
                    />
                    <BulletPointsWithHeading
                        heading="Community Interaction:"
                        points={
                            [
                                "All users must follow the code of conduct outlined in our Community Guidelines.",
                                "Disrespectful or abusive behaviour towards other users or the platform will result in account suspension."
                            ]
                        }
                    />

                </>
            )
        },
        {
            title: '8. Cosmic Copyright & Intellectual Property Rights',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Intellectual Property Ownership:"
                        points={
                            [
                                "All content, designs, and products on LXS Store, including images, videos, logos, and text, are protected under copyright and belong to LXS Store or respective owners.",
                                "Unauthorized use or distribution of our intellectual property is prohibited."
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Seller & Artist Rights:"
                        points={
                            [
                                "Sellers and artists must ensure that they have the necessary rights to sell or distribute products listed on the platform.",
                                "By listing products, sellers agree to indemnify LXS Store against any copyright infringement claims."
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '9. Fair Trading & Ethical Sourcing Policy',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Ethical Sourcing:"
                        points={
                            [
                                "LXS Store works with trusted suppliers who meet high standards of ethics, Labor practices, and environmental responsibility.",
                                "We strive to reduce our environmental footprint by sourcing eco-friendly materials and packaging."
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Prohibited Products:"
                        points={
                            [
                                "Counterfeit, stolen, or otherwise illicit products are strictly prohibited from being listed or sold on our platform."
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '10. Galactic Dispute Resolution & Customer Support',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Dispute Resolution Process:"
                        points={
                            [
                                "Customers can raise disputes for issues such as non-delivery, defective products, or payment errors.",
                                "Disputes will be investigated within 5-7 business days.",
                                "In case of an unresolved dispute, customers can escalate the issue to third-party mediation.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Customer Support Contact:"
                        points={
                            [
                                "For support, you can reach us via email, phone, or live chat.",
                                "Our support team is available from [X:XX AM to X:XX PM] for any inquiries."
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '11. Legal Compliance Across the Multiverse',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Compliance with Laws:"
                        points={
                            [
                                "All users are required to comply with local, national, and international laws governing online transactions.",
                                "LXS Store is not liable for any actions that violate legal obligations in the buyer's jurisdiction."
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '12. Policy Updates & Notifications',
            content: (
                <>
                    <ul className="list-disc list-inside space-y-1 leading-5 pl-14 -indent-[22px]">
                        <li>LXS Store reserves the right to update or modify policies as necessary.</li>
                        <li>Significant policy changes will be communicated via email notifications or website announcements.</li>
                        <li>Your continued use of the platform signifies acceptance of the updated policies.</li>
                        <li>For any queries, support, or disputes, feel free to contact us: <br />
                            Email: [Insert Support Email] <br />
                            Phone: [Insert Contact Number]</li>
                    </ul>

                    <p className="mt-5">
                        Visit our [Help Centre] for FAQs and additional resources.
                    </p>
                    <p className="mt-5">
                        "At LXS Store, we connect galaxies, build communities, and ensure fair, secure, and innovative commerce.
                        Thank you for being part of our intergalactic journey!"
                    </p>
                </>
            )
        },
    ];
    return (
        <div className="w-full mx-auto px-20 py-5">
            <HeadingText name="Intergalactic Framework Policy" className="text-[40px]" />
            <p className="text-lg my-4">"One Universe, One Policy – A Seamless Shopping Experience Across the Multiverse"</p>
            <p className="text-lg font-medium mb-4">Updated: 22.06.2025</p>
            <p className="mb-4 text-lg leading-6 w-3/4">
                Welcome to LXS Store – your one-stop intergalactic shop, offering a seamless and secure shopping
                experience with the most futuristic and innovative features. This Intergalactic Policy Framework is designed
                to help you navigate through our platform, covering all aspects of shopping, payments, returns,
                marketplace interactions, intellectual property, and much more. Whether you are a shopper, seller,
                influencer, artist, job poster, or brand partner, this policy ensures transparency, fairness, and trust across our
                multiverse-themed marketplace.
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

export default IntergalacticFrameworkPolicy
