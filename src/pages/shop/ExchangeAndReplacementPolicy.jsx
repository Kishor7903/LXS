import BulletPointsWithHeading from "@/components/BulletPointsWithHeading";
import HeadingText from "@/components/HeadingText";
import { useState } from "react";

function ExchangeAndReplacementPolicy() {
    const [openIndex, setOpenIndex] = useState(-1);

    const toggleSection = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    const sections = [
        {
            title: '1. General Exchange & Replacement Guidelines',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Who is Eligible for Exchanges & Replacements?"
                        points={
                            [
                                "Buyers who receive damaged, defective, or incorrect products.",
                                "Buyers who need a different size, colour, or variation of the same product.",
                                "Buyers who request an exchange within [X] days of delivery.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="What Can Be Exchanged or Replaced?"
                        points={
                            [
                                "Clothing & Accessories: If the size or colour is incorrect.",
                                "Defective or Damaged Items: Items with manufacturing defects.",
                                "Wrong Products: If you received the wrong item.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="What Cannot Be Exchanged or Replaced?"
                        points={
                            [
                                "Customized or personalized products.",
                                "Digital products (e-books, 3D models, artwork, etc.).",
                                "Items that have been used, washed, or damaged by the customer.",
                                "Sale, clearance, or final sale items (unless defective).",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Exchange Timeframe:"
                        points={
                            [
                                "Exchanges must be requested within [X] days of delivery.",
                                "The new item will be shipped once the returned item is received and inspected.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '2. Exchange & Replacement Process',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="How to Request an Exchange?"
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
                        heading="How to Request a Replacement?"
                        points={
                            [
                                "If you receive a defective or incorrect item, a replacement will be provided.",
                                "If the item is out of stock, you can choose an alternative product or a refund.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Exchange Processing Time:"
                        points={
                            [
                                "Once the seller approves the exchange, the new item will be shipped within [X] days.",
                                "Tracking details will be shared via email.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Replacement Processing Time:"
                        points={
                            [
                                "Replacements are processed within [X] business days after receiving the returned item.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '3. Shipping & Costs for Exchanges',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Who Pays for Exchange Shipping?"
                        points={
                            [
                                "Reason for Exchange Who Pays Return Shipping? Who Pays New Shipping?",
                                "Wrong/Damaged Item Seller Pays",
                                "Size/Colour Exchange Customer Pays Seller Pays",
                                "Buyer’s Change of Mind Customer Pays",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="How to Ship the Item Back?"
                        points={
                            [
                                "Use the provided return shipping label (if applicable).",
                                "Pack the item securely in original packaging.",
                                "Provide tracking details to ensure safe delivery.",
                            ]
                        }
                    />

                </>
            )
        },
        {
            title: '4. Exceptions for Art Marketplace, Influencers, & Jobs',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Digital Art & 3D Models:"
                        points={
                            [
                                "No exchanges allowed for digital downloads.",
                                "If a digital product is defective, contact support for a resolution.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Influencer & Job Marketplace Exchanges:"
                        points={
                            [
                                "Job postings and influencer collaborations cannot be exchanged.",
                                "If an influencer fails to deliver, a replacement influencer may be suggested.",
                            ]
                        }
                    />

                </>
            )
        },
        {
            title: '5. Contact & Support',
            content: (
                <>
                    <p className="mb-2">
                        For any exchange or replacement requests, contact LXS Store Customer Support:
                    </p>

                    <ul className="list-disc list-inside space-y-1 leading-5 pl-14 -indent-[22px]">
                        <li><i className="fi fi-rr-envelope relative top-[2px]"></i> Email: [Insert support email]"</li>
                        <li><i className="fi fi-rr-phone-call relative top-[2px]"></i> Phone: [Insert contact number]"</li>
                        <li><i className="fi fi-rs-comment relative top-[2px]"></i> Live Chat: Available from [X:XX AM – X:XX PM]"</li>
                    </ul>

                    <p className="mt-5">
                        This Exchange & Replacement Policy ensures a smooth shopping experience. If you have any concerns,
                        reach out to our support team!
                    </p>
                </>
            )
        },
    ];

    return (
        <div className="w-full mx-auto px-20 py-5">
            <HeadingText name="Exchange & Replacement Policy" className="text-[40px]" />
            <p className="text-lg font-medium mb-4">Updated: 22.06.2025</p>
            <p className="mb-4 text-lg leading-6 w-3/4">
                At LXS Store, we understand that sometimes a product may not meet your expectations. Our Exchange &
                Replacement Policy ensures that you can exchange or replace eligible products under specific conditions.
            </p>
            <p className="mb-4 text-lg leading-6 w-3/4">
                This policy applies to physical products purchased through our platform and does not cover digital items,
                job postings, influencer collaborations, or subscription services.
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

export default ExchangeAndReplacementPolicy
