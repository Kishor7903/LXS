import BulletPointsWithHeading from "@/components/BulletPointsWithHeading";
import HeadingText from "@/components/HeadingText";
import { useState } from "react";


function OrderCancellationPolicy() {
    const [openIndex, setOpenIndex] = useState(-1);

    const toggleSection = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    const sections = [
        {
            title: '1. Eligibility for Order Cancellation',
            content: (
                <>
                    <p className="mb-2">
                        When Can You Cancel an Order?
                    </p>

                    <BulletPointsWithHeading
                        heading="You can cancel an order under the following conditions:"
                        points={
                            [
                                "Before shipment: Orders can be cancelled any time before they are shipped.",
                                "After shipment: Orders cannot be cancelled once they are shipped. You may initiate a return after delivery (as per our Return & Refund Policy).",
                                "Custom or made-to-order items: These orders cannot be cancelled once placed, as they are specially made for you.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Seller & Marketplace Orders:"
                        points={
                            [
                                "Orders fulfilled by third-party sellers may have different cancellation policies.",
                                "Some sellers may charge a cancellation fee if the item has already been processed.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '2. How to Cancel an Order?',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Cancel Through Your Account:"
                        points={
                            [
                                "Log in to your LXS Store Account.",
                                "Go to My Orders → Select the order you want to cancel.",
                                "Click Cancel Order and select a reason.",
                                "You will receive a confirmation email/SMS once your cancellation is successful.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Cancel via Customer Support:"
                        points={
                            [
                                "If you face issues cancelling online, contact our Customer Support team for assistance.",
                                "Orders that are already packed or shipped cannot be cancelled via support.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '3. Cancellation Refunds',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="When Will You Get a Refund?"
                        points={
                            [
                                "If an order is cancelled before shipment, a full refund will be issued.",
                                "If an order is cancelled after shipment, it cannot be refunded (you may return it after delivery).",
                                "Refunds are processed as per the original payment method.",
                            ]
                        }
                    />

                    <span className="font-medium">Refund Processing Time:</span>
                    <ul className="list-disc list-inside space-y-1 leading-5 pl-14 -indent-[22px] w-[45%]">
                        <li><span>Payment Method</span> <span className="float-end">Refund Timeframe</span></li>
                        <li><span className="mr-12">UPI & Wallets</span> <span className="float-end">1-3 business days</span></li>
                        <li><span className="mr-5">Credit/Debit Cards</span> <span className="float-end">5-7 business days</span></li>
                        <li><span className="mr-5">Net Banking</span> <span className="float-end">5-10 business days</span></li>
                        <li><span className="mr-5">PayPal (International)</span> <span className="float-end">7-10 business days</span></li>
                        <li><span className="mr-5">Cash on Delivery (COD)</span><span className="float-end">Refunded via bank transfer or store credit</span></li>
                    </ul>
                </>
            )
        },
        {
            title: '4. Cancellation for Digital Products & Art Marketplace',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Digital Products & Services:"
                        points={
                            [
                                "Digital downloads, art files, and virtual products cannot be cancelled or refunded once purchased.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Art Marketplace & Custom Orders:"
                        points={
                            [
                                "Custom art, handmade products, and print-on-demand items are not eligible for cancellation after confirmation.",
                            ]
                        }
                    />

                </>
            )
        },
        {
            title: '5. Order Cancellation by LXS Store',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="When LXS Store May Cancel an Order:"
                        points={
                            [
                                "LXS Store reserves the right to cancel an order in the following cases:",
                                "Product out of stock or unavailable",
                                "Payment not received (for prepaid orders)",
                                "Incorrect shipping address provided by customer",
                                "Fraudulent or suspicious transaction detected",
                                "Violations of LXS Store policies",
                                "If we cancel your order, a full refund will be issued to your original payment method.",
                            ]
                        }
                    />

                    <p className="mt-5">
                        This Order Cancellation Policy ensures a fair and transparent process for customers and sellers. If you have
                        any concerns, feel free to reach out to our support team!
                    </p>
                </>
            )
        },
    ];

    return (
        <div className="w-full mx-auto px-20 py-5">
            <HeadingText name="Order Cancellation Policy" className="text-[40px]" />
            <p className="text-lg font-medium mb-4">Updated: 22.06.2025</p>
            <p className="mb-4 text-lg leading-6 w-3/4">
                At LXS Store, we strive to provide a seamless shopping experience. This policy explains how you can cancel
                an order, cancellation eligibility, refund timelines, and other important details.
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

export default OrderCancellationPolicy
