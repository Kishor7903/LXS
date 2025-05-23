import BulletPointsWithHeading from "@/components/BulletPointsWithHeading";
import HeadingText from "@/components/HeadingText";
import { useState } from "react";


function GeneralShoppingPolicy() {
    const [openIndex, setOpenIndex] = useState(-1);

    const toggleSection = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    const sections = [
        {
            title: '1. Shopping Eligibility & Account Requirements',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Who Can Shop on LXS Store?"
                        points={
                            [
                                "Customers must be at least 18 years old or have parental/guardian consent to shop.",
                                "A valid email address and contact details are required for order processing.",
                                "Customers must provide accurate shipping and payment information.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="User Account:"
                        points={
                            [
                                "Creating an account is optional for shopping but recommended for order tracking and faster checkout.",
                                "Users are responsible for keeping their account information secure.",
                                "Any misuse of accounts may lead to suspension or termination.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '2. Product Listings & Availability',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Product Information:"
                        points={
                            [
                                "We ensure accurate descriptions, specifications, and images for all products.",
                                "Colours and textures may slightly vary due to screen differences or manufacturing variations.",
                                "Customers must read product details before purchasing to avoid misunderstandings.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Product Availability:"
                        points={
                            [
                                "Product availability is subject to stock levels.",
                                "If an item goes out of stock after an order is placed, customers will be notified and refunded or offered an alternative.",
                                "Limited edition or seasonal products may have special terms for purchasing and returns.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '3. Ordering Process',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Placing an Order:"
                        points={
                            [
                                "Customers must add products to the cart and proceed to secure checkout.",
                                "Orders are confirmed only after successful payment processing.",
                                "Customers receive an email confirmation with order details and tracking information.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Order Modifications:"
                        points={
                            [
                                "Once an order is placed, modifications (address changes, product changes) are not guaranteed.",
                                "Customers must contact Customer Support immediately for modification requests.",
                                "LXS Store reserves the right to cancel or modify orders due to pricing errors, stock issues, or fraud detection.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '4. Pricing & Discounts',
            content: (
                <>
                    <BulletPointsWithHeading
                        points={
                            [
                                "All prices are displayed in the applicable currency inclusive/exclusive of taxes (as mentioned on the product page).",
                                "Discounts, promo codes, and loyalty rewards apply only to eligible purchases.",
                                "Misuse of discounts or fraudulent claims may lead to order cancellation.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '5. Payment & Checkout',
            content: (
                <>
                    <BulletPointsWithHeading
                        points={
                            [
                                "We support multiple secure payment methods including credit/debit cards, PayPal, UPI, and digital wallets.",
                                "Payment must be completed at checkout for orders to be processed.",
                                "Failed or declined payments may result in order cancellation.",
                                "Customers should verify billing details to avoid payment failures.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '6. Shipping & Delivery',
            content: (
                <>
                    <BulletPointsWithHeading
                        points={
                            [
                                "Orders are shipped based on the chosen shipping method at checkout.",
                                "Estimated delivery timeframes are provided before checkout.",
                                "Customers receive a tracking number once the order is dispatched.",
                                "Delivery delays may occur due to unforeseen circumstances (weather, customs, strikes, etc.).",
                            ]
                        }
                    />

                    <p className="mt-5">
                        Refer to our [Shipping & Delivery Policy] for more details.
                    </p>
                </>
            )
        },
        {
            title: '7. Order Cancellation',
            content: (
                <>
                    <BulletPointsWithHeading
                        points={
                            [
                                "Customers can request order cancellations within a specific time frame (before dispatch).",
                                "Once shipped, orders cannot be cancelled.",
                                "LXS Store may cancel orders due to payment failures, fraudulent activities, or stock unavailability.",
                            ]
                        }
                    />

                    <p className="mt-5">
                    Refer to our [Order Cancellation Policy] for more details.
                    </p>
                </>
            )
        },
        {
            title: '8. Returns, Refunds & Exchanges',
            content: (
                <>
                    <BulletPointsWithHeading
                        points={
                            [
                                "Customers may return eligible products under our Return & Refund Policy.",
                                "Items must be returned in original condition with tags and packaging.",
                                "Certain products may be non-returnable or have special return conditions.",
                            ]
                        }
                    />

                    <p className="mt-5">
                    Refer to our [Return & Refund Policy] and [Exchange & Replacement Policy] for more details.
                    </p>
                </>
            )
        },
        {
            title: '9. Customer Support & Complaint Resolution',
            content: (
                <>
                    <BulletPointsWithHeading
                        points={
                            [
                                "For any shopping-related concerns, customers can contact our Customer Support team.",
                                "We offer multiple support channels, including email, live chat, and phone support.",
                                "Complaints and disputes will be resolved as per our Customer Support & Complaint Resolution Policy.",
                            ]
                        }
                    />

                    <p className="mt-5">
                    Refer to our [Customer Support Policy] for more details.
                    </p>
                </>
            )
        },
        {
            title: '10. Compliance & Legal Policies',
            content: (
                <>
                    <BulletPointsWithHeading
                        points={
                            [
                                "By shopping on LXS Store, customers agree to abide by all platform policies and terms.",
                                "Fraudulent transactions, unauthorized returns, or misuse of services may lead to account suspension and legal action.",
                            ]
                        }
                    />

                    <p className="mt-5">
                    Refer to our [Legal Compliance Policy] for more details.
                    </p>
                </>
            )
        },
        {
            title: '11. Policy Updates',
            content: (
                <>
                    <BulletPointsWithHeading
                        points={
                            [
                                "LXS Store reserves the right to update this policy as needed.",
                                "Changes will be notified to customers via email or website announcements.",
                                "Customers are encouraged to review this policy periodically.",
                            ]
                        }
                    />

                    <p className="mt-5">
                    Thank you for shopping with LXS Store – where innovation meets style!
                    </p>
                </>
            )
        },
    ];
    
    return (
        <div className="w-full mx-auto px-20 py-5">
            <HeadingText name="General Shopping Policy" className="text-[40px]" />
            <p className="text-lg font-medium mb-4">Updated: 22.06.2025</p>
            <p className="mb-4 text-lg leading-6 w-3/4">
                At LXS Store, we are committed to providing a seamless and enjoyable shopping experience for all our
                customers. This General Shopping Policy outlines the key guidelines for shopping on our platform, ensuring
                transparency, fairness, and customer satisfaction.
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

export default GeneralShoppingPolicy
