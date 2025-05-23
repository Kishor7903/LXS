import BulletPointsWithHeading from "@/components/BulletPointsWithHeading";
import HeadingText from "@/components/HeadingText";
import { useState } from "react";

function PaymentAndCheckoutPolicy() {
    const [openIndex, setOpenIndex] = useState(-1);

    const toggleSection = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    const sections = [
        {
            title: '1. Accepted Payment Methods',
            content: (
                <>
                    <p className="mb-2">
                        We accept the following payment methods:
                    </p>

                    <BulletPointsWithHeading
                        heading="Online Payments:"
                        points={
                            [
                                "Credit & Debit Cards (Visa, MasterCard, RuPay, American Express, etc.)",
                                "UPI Payments (Google Pay, PhonePe, Paytm, BHIM, etc.)",
                                "Net Banking (All major banks in India)",
                                "PayPal (For international customers)",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Wallet Payments:"
                        points={
                            [
                                "Paytm Wallet",
                                "Amazon Pay",
                                "PhonePe Wallet",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Cash on Delivery (COD):"
                        points={
                            [
                                "COD is available for select locations (additional charges may apply).",
                                "COD orders must be paid in cash at the time of delivery.",
                                "For high-value orders, an advance deposit may be required.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="EMI & Buy Now, Pay Later (BNPL):"
                        points={
                            [
                                "EMI options are available via partnered banks & credit card providers.",
                                "BNPL services (such as Simpl, LazyPay) may be available for eligible customers.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '2. Payment Security & Fraud Protection',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Secure Transactions:"
                        points={
                            [
                                "All payments are processed through encrypted and PCI-compliant payment gateways.",
                                "Your card details are never stored on our servers for security reasons.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Fraud Prevention:"
                        points={
                            [
                                "If a transaction is flagged as suspicious, we may request ID verification before processing.",
                                "Fraudulent transactions will be blocked and reported to authorities.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '3. Checkout Process & Order Confirmation',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Steps to Complete Checkout:"
                        points={
                            [
                                "Add products to your cart.",
                                "Click on Checkout and enter shipping details.",
                                "Choose your payment method.",
                                "Review your order summary.",
                                "Click Place Order and complete payment.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Order Confirmation:"
                        points={
                            [
                                "After successful payment, you will receive an order confirmation email & SMS.",
                                "If payment fails, you will be prompted to retry or select another method.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '4. Payment Issues & Failed Transactions',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Common Payment Failures:"
                        points={
                            [
                                "Insufficient balance.",
                                "Expired or blocked card.",
                                "Incorrect card details or CVV.",
                                "Bank server downtime.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="What to Do If Your Payment Fails?"
                        points={
                            [
                                "Try a different payment method.",
                                "Contact your bank or card provider.",
                                "Reach out to LXS Store Customer Support for assistance.",
                            ]
                        }
                    />

                </>
            )
        },
        {
            title: '5. Refunds & Payment Reversals',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="When Are Refunds Issued?"
                        points={
                            [
                                "Order Cancellation: If you cancel an order before shipment.",
                                "Failed Payments: If your money was deducted but the order was not placed.",
                                "Returns & Refunds: As per our Return & Refund Policy.",
                            ]
                        }
                    />

                    <span className="font-medium">Refund Processing Time:</span>
                    <ul className="list-disc list-inside space-y-1 leading-5 pl-14 -indent-[22px] w-[36%]">
                        <li><span>Payment Method</span> <span className="float-end">Refund Timeframe</span></li>
                        <li><span className="mr-12">UPI & Wallets</span> <span className="float-end">1-3 business days</span></li>
                        <li><span className="mr-5">Credit/Debit Cards</span> <span className="float-end">5-7 business days</span></li>
                        <li><span className="mr-5">Net Banking</span> <span className="float-end">5-10 business days</span></li>
                        <li><span className="mr-5">PayPal (International)</span> <span className="float-end">7-10 business days</span></li>
                        <li>Refunds are credited to the original payment method.</li>
                    </ul>

                    <p className="mt-5">
                        COD orders are refunded via bank transfer or store credit.
                    </p>
                </>
            )
        },
        {
            title: '6. Subscriptions & Recurring Payments',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Subscription Payments:"
                        points={
                            [
                                "Some services (e.g., premium memberships, digital content) may require subscription-based payments.",
                                "You can manage subscriptions from My Account → Subscription Settings.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Auto-Renewal & Cancellation:"
                        points={
                            [
                                "Subscriptions may be auto-renewed unless canceled before the renewal date.",
                                "You can manage subscriptions from My Account → Subscription Settings.",
                            ]
                        }
                    />

                </>
            )
        },
        {
            title: '7. Digital Products & Art Marketplace Payments',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Digital Art & Downloads:"
                        points={
                            [
                                "Digital products are delivered instantly after payment.",
                                "Due to the nature of digital goods, no refunds are allowed.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Art Marketplace & Seller Payouts:"
                        points={
                            [
                                "Artists & sellers receive payouts via bank transfer, UPI, or PayPal.",
                                "Payouts are processed within [X] business days after order completion.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '8. Payment Disputes & Chargebacks',
            content: (
                <>
                    <BulletPointsWithHeading
                        points={
                            [
                                "If you see an unauthorized charge, report it to LXS Store Support immediately.",
                                "Chargebacks without valid reasons may lead to account suspension.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '9. Contact & Support',
            content: (
                <>
                    <p className="mb-2">
                        For payment-related issues, contact LXS Store Customer Support:
                    </p>

                    <ul className="list-disc list-inside space-y-1 leading-5 pl-14 -indent-[22px]">
                        <li><i className="fi fi-rr-envelope relative top-[2px]"></i> Email: [Insert support email]"</li>
                        <li><i className="fi fi-rr-phone-call relative top-[2px]"></i> Phone: [Insert contact number]"</li>
                        <li><i className="fi fi-rs-comment relative top-[2px]"></i> Live Chat: Available from [X:XX AM – X:XX PM]"</li>
                    </ul>
                    <p className="mt-5">
                        Thank you for shopping with LXS Store – where innovation meets style!
                    </p>
                </>
            )
        },
    ];

    return (
        <div className="w-full mx-auto px-20 py-5">
            <HeadingText name="Payment & Checkout Policy" className="text-[40px]" />
            <p className="text-lg font-medium mb-4">Updated: 22.06.2025</p>
            <p className="mb-4 text-lg leading-6 w-3/4">
                At LXS Store, we provide secure and flexible payment options for a smooth checkout experience. This policy
                outlines the accepted payment methods, security measures, refunds, and other important details regarding
                payments.
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

export default PaymentAndCheckoutPolicy
