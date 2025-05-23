import BulletPointsWithHeading from "@/components/BulletPointsWithHeading";
import HeadingText from "@/components/HeadingText";
import { useState } from "react";

function ShippingAndDeliveryPolicy() {
    const [openIndex, setOpenIndex] = useState(-1);

    const toggleSection = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    const sections = [
        {
            title: '1. General Shipping Information',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Where Do We Ship?"
                        points={
                            [
                                "We ship nationwide (India) and offer international shipping to select countries.",
                                "Shipping availability varies by product type and seller location.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Shipping Partners:"
                        points={
                            [
                                "We work with trusted courier services such as DHL, FedEx, Blue Dart, DTDC, Delhivery, and India Post.",
                                "The courier service is selected based on destination and delivery speed.",
                            ]
                        }
                    />

                    <span className="font-medium">Estimated Delivery Time:</span>
                    <ul className="list-disc list-inside space-y-1 leading-5 pl-14 -indent-[22px] w-[52%]">
                        <li><span>Shipping Type</span> <span className="float-end">Delivery Time (Domestic) Delivery Time (International)</span></li>
                        <li><span className="mr-12">Standard Shipping</span> <span className="float-end">5-10 business days 10-20 business days</span></li>
                        <li><span className="mr-5">Express Shipping</span> <span className="float-end">2-5 business days 5-10 business days</span></li>
                        <li><span className="mr-5">Same-Day/Next-Day Delivery</span> <span className="float-end">Available in select cities</span></li>
                        <li>Delivery times may vary due to location, product availability, and courier delays.</li>
                        <li>Custom-made or print-on-demand items may take additional processing time.</li>
                    </ul>
                </>
            )
        },
        {
            title: '2. Order Processing & Fulfillment',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Order Processing Time:"
                        points={
                            [
                                "Orders are processed within 24-48 hours (excluding weekends and holidays).",
                                "Custom orders or bulk orders may require additional processing time.",
                                "You will receive an order confirmation email with tracking details once your order is shipped.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Tracking Your Order:"
                        points={
                            [
                                "After shipping, you will receive a tracking number via email/SMS.",
                                "You can track your order using the Track Order page on our website.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '3. Shipping Costs & Charges',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="How Is Shipping Cost Calculated?"
                        points={
                            [
                                "Shipping charges depend on weight, size, delivery location, and shipping method.",
                                "You can see the exact shipping cost at checkout before payment.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Free Shipping:"
                        points={
                            [
                                "We offer free shipping for orders above [X] amount (domestic orders only).",
                                "Free shipping promotions do not apply to international orders.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Cash on Delivery (COD) Orders:"
                        points={
                            [
                                "COD is available in select locations (additional charges may apply).",
                                "COD orders must be paid in cash to the delivery partner upon receiving the package.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '4. International Shipping',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Customs & Import Duties:"
                        points={
                            [
                                "International orders may be subject to customs duties and taxes, which vary by country.",
                                "The buyer is responsible for any additional import taxes, duties, or clearance fees.",
                                "LXS Store is not responsible for delays due to customs clearance.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Restricted Items:"
                        points={
                            [
                                "Some items may not be eligible for international shipping due to legal restrictions.",
                                "Buyers should check local import laws before placing an order.",
                            ]
                        }
                    />

                </>
            )
        },
        {
            title: '5. Failed Deliveries & Address Issues',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Wrong or Incomplete Address:"
                        points={
                            [
                                "If the shipping address is incorrect or incomplete, delivery may be delayed or failed.",
                                "Customers must provide accurate and complete address details during checkout.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Missed Delivery Attempts:"
                        points={
                            [
                                "Couriers attempt multiple deliveries before returning the package.",
                                "If the package is returned to the sender, customers may need to pay additional shipping fees for re-delivery.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Lost or Stolen Packages:"
                        points={
                            [
                                "If your package is lost in transit, contact LXS Store Support immediately.",
                                "We will assist with filing a courier claim and reshipping the item if applicable.",
                                'LXS Store is not responsible for stolen packages once marked as "Delivered."',
                            ]
                        }
                    />

                </>
            )
        },
        {
            title: '6. Special Shipping Policies for Sellers, Artists & Influencers',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Seller Shipping Responsibilities:"
                        points={
                            [
                                "Sellers must dispatch orders within the committed timeframe.",
                                "Sellers are responsible for proper packaging to avoid damage in transit.",
                                "Sellers must provide valid tracking details for every shipment.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Art Marketplace Shipping:"
                        points={
                            [
                                "Physical artwork may require special shipping arrangements.",
                                "Artists must specify handling time and shipping costs in their product listings.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Influencer & Service-Based Orders:"
                        points={
                            [
                                "Digital services and influencer collaborations do not require physical shipping.",
                                "All transactions are managed electronically through our platform.",
                            ]
                        }
                    />

                    <p className="mt-5">
                        This Shipping & Delivery Policy ensures transparency and reliability. If you have any concerns, feel free to
                        reach out to our support team!
                    </p>
                </>
            )
        },
    ];

    return (
        <div className="w-full mx-auto px-20 py-5">
            <HeadingText name="Shipping & Delivery Policy" className="text-[40px]" />
            <p className="text-lg font-medium mb-4">Updated: 22.06.2025</p>
            <p className="mb-4 text-lg leading-6 w-3/4">
                At LXS Store, we aim to deliver your orders safely and on time. This policy outlines the shipping and delivery
                process, estimated timelines, shipping costs, tracking, and other important details.
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

export default ShippingAndDeliveryPolicy
