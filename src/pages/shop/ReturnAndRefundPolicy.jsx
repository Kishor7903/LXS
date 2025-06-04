import BulletPointsWithHeading from "@/components/BulletPointsWithHeading";
import HeadingText from "@/components/HeadingText";
import { useState } from "react";

function ReturnAndRefundPolicy() {
    const [openIndex, setOpenIndex] = useState(-1);

    const toggleSection = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    const sections = [
        {
            title: '1. General Return & Refund Policy',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Who is Eligible for Returns & Refunds?"
                        points={
                            [
                                "Buyers who purchase physical products from LXS Store.",
                                "Users who purchase digital goods or services (restrictions apply).",
                                "Job seekers, companies, and influencers (only for eligible refund cases).",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="What Can Be Returned?"
                        points={
                            [
                                "Physical Products: Clothing, accessories, and other items must be unused, in original packaging, and returned within [X] days (seller-specific).",
                                "Defective or Wrong Items: If you receive a damaged, defective, or incorrect product, you may request a return.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="What Cannot Be Returned?"
                        points={
                            [
                                "Personalized/custom-made products (unless damaged or incorrect).",
                                "Digital downloads (e-books, art, 3D models, etc.).",
                                "Subscription fees and service charges.",
                                "Job postings, influencer listings, and artist promotions.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Return Timeframe:"
                        points={
                            [
                                "Returns must be requested within [X] days of receiving the product. Each seller may have a specific return policy mentioned on the product page.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '2. Return & Refund Process',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="How to Request a Return?"
                        points={
                            [
                                "Go to My Orders → Select the order.",
                                "Click Request Return and choose the reason.",
                                "Attach images (for damaged/incorrect items).",
                                "Wait for seller approval and return instructions.",
                                "Ship the item back (return shipping may apply).",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="How to Get a Refund?"
                        points={
                            [
                                "Once the seller verifies the return, your refund will be processed.",
                                "Refunds are credited back to your original payment method within [X] business days.",
                                "For Cash on Delivery (COD) orders, refunds may be issued as store credits or bank transfers.",
                            ]
                        }
                    />

                    <span className="font-medium">Refund Processing Time:</span>
                    <ul className="list-disc list-inside space-y-1 leading-5 pl-14 -indent-[22px] w-[45%]">
                        <li><span>Payment Method</span> <span className="float-end">Refund Time</span></li>
                        <li><span className="mr-5">Credit/Debit Cards</span> <span className="float-end">5-7 business days</span></li>
                        <li><span className="mr-5">PayPal (International)</span> <span className="float-end">3-5 business days</span></li>
                        <li><span className="mr-5">LXS Store Credit</span><span className="float-end">Instant Upon Approval</span></li>
                        <li><span className="mr-5">Bank Transfer (COD Orders)</span><span className="float-end">7-10 Business Days</span></li>
                    </ul>
                </>
            )
        },
        {
            title: '3. Seller Return & Refund Guidelines',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Seller Responsibilities:"
                        points={
                            [
                                "Clearly mention return eligibility on product pages.",
                                "Respond to return requests within [X] business days.",
                                "Process refunds promptly after receiving returned items.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Return Shipping Costs:"
                        points={
                            [
                                "If the return is due to a seller’s mistake (wrong/damaged item), the seller covers return shipping.",
                                "If the buyer changes their mind, they may need to pay return shipping.",
                            ]
                        }
                    />

                </>
            )
        },
        {
            title: '4. Digital Products & Art Marketplace Refunds',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Are Digital Products Refundable?"
                        points={
                            [
                                "No. Digital items like e-books, artwork, 3D models, or downloadable content cannot be refunded once downloaded.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Exceptions for Refunds: "
                        subHeading="Refunds may be approved if:"
                        points={
                            [
                                "The file is corrupted or incomplete.",
                                "The seller failed to deliver a custom order.",
                                "The product does not match the description.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Art Marketplace Refund Policy:"
                        points={
                            [
                                "Digital art sales are final (unless proven defective).",
                                "Physical artwork may be returned based on the artist’s return policy.",
                            ]
                        }
                    />

                </>
            )
        },
        {
            title: '5. Influencer, Job, & Service Refunds',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Refunds for Job Posters & Employers:"
                        points={
                            [
                                "Job posting fees are non-refundable after the job goes live.",
                                "If a job listing is removed due to policy violations, no refund will be given.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Refunds for Influencers & Brand Collaborations:"
                        points={
                            [
                                "Payments for completed collaborations are final.",
                                "If an influencer fails to deliver agreed-upon content, a refund request can be made.",
                                "Disputes must be reported within 7 days of the scheduled postdate.",
                            ]
                        }
                    />
                    <BulletPointsWithHeading
                        heading="Refunds for Services & Subscriptions:"
                        points={
                            [
                                "Subscription fees are non-refundable once activated.",
                                "If LXS Store terminates a subscription early, a pro-rated refund may be issued.",
                            ]
                        }
                    />

                </>
            )
        },
        {
            title: '6. Disputes & Chargebacks',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="What to Do If a Seller Refuses a Refund?"
                        points={
                            [
                                "Contact LXS Store Support with order details and proof.",
                                "If the seller is unresponsive, we may mediate the dispute.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Chargeback Policy:"
                        subHeading="If you file a chargeback with your bank or PayPal:"
                        points={
                            [
                                "Your LXS Store account may be suspended during the investigation.",
                                "Chargebacks must be valid, false claims may result in a permanent account ban.",
                            ]
                        }
                    />

                    <p className="mt-5">
                        This Return & Refund Policy ensures a smooth and transparent experience for all users. If you have any
                        concerns, feel free to reach out to our support team!
                    </p>
                </>
            )
        },
    ];

    return (
        <div className="w-full mx-auto px-20 py-5">
            <HeadingText name="Return & Refund Policy" className="text-[40px]" />
            <p className="text-lg font-medium mb-4">Updated: 22.06.2025</p>
            <p className="mb-4 text-lg leading-6 w-3/4">
                At LXS Store, we strive to provide the best online shopping and marketplace experience. Our Return & Refund
                Policy is designed to ensure transparency and fairness for buyers, sellers, artists, job posters, influencers, and
                companies.
            </p>
            <p className="mb-4 text-lg leading-6 w-3/4">
                Before requesting a return or refund, please read the applicable sections carefully.
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

export default ReturnAndRefundPolicy
