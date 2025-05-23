import BulletPointsWithHeading from "@/components/BulletPointsWithHeading";
import HeadingText from "@/components/HeadingText";
import { useState } from "react";

function CustomerSupportAndComplaintResolutionPolicy() {
    const [openIndex, setOpenIndex] = useState(-1);

    const toggleSection = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    const sections = [
        {
            title: '1. Customer Support Contact Details',
            content: (
                <>
                    <p className="mb-2">
                        For any inquiries, complaints, or assistance, reach out to LXS Store Customer Support via:
                    </p>

                    <ul className="list-disc list-inside space-y-1 leading-5 pl-14 -indent-[22px]">
                        <li><i className="fi fi-rr-envelope relative top-[2px]"></i> Email: [Insert support email]</li>
                        <li><i className="fi fi-rr-phone-call relative top-[2px]"></i> Phone: [Insert contact number]</li>
                        <li><i className="fi fi-rs-comment relative top-[2px]"></i> Live Chat: Available from [X:XX AM – X:XX PM]</li>
                        <li><i className="fi fi-rr-thumbtack relative top-[2px]"></i> Help Center: [Insert Link]</li>
                    </ul>

                </>
            )
        },
        {
            title: '2. Common Customer Queries Handled by Support',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="We assist customers with:"
                        points={
                            [
                                "Order Tracking & Shipping Issues",
                                "Returns, Refunds & Exchanges",
                                "Payment & Checkout Assistance",
                                "Product & Seller Complaints",
                                "Account & Login Issues",
                                "Technical Errors & Website Glitches",
                                "Seller, Artist & Influencer Disputes",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '3. Complaint Resolution Process',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Step 1: Submit a Complaint:"
                        subHeading="Customers can submit a complaint via email, phone, or live chat. When reporting an issue, please provide:"
                        points={
                            [
                                "Order ID (if applicable)",
                                "Detailed description of the issue",
                                "Supporting documents (screenshots, payment proof, etc.)",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Step 2: Acknowledgment & Initial Review:"
                        points={
                            [
                                "Acknowledgment email will be sent within 24 hours.",
                                "Our team will review the complaint and may request additional details.",
                            ]
                        }
                    />

                    <span className="font-bold">Step 3: Resolution Process & Timeframe:</span>
                    <ul className="list-disc list-inside space-y-1 leading-5 pl-14 -indent-[22px] w-[63%]">
                        <li><span>Complaint Type</span> <span className="float-end">Estimated Resolution Time</span></li>
                        <li><span className="mr-5">Order Delays</span> <span className="float-end">24-48 hours</span></li>
                        <li><span className="mr-5">Payment Failures & Refund Issues</span> <span className="float-end">5-7 business days</span></li>
                        <li><span className="mr-5">Damaged or Wrong Product Received</span><span className="float-end">3-5 business days</span></li>
                        <li><span className="mr-5">Return & Exchange Requests </span><span className="float-end">5-7 business days</span></li>
                        <li><span className="mr-5">Technical Issues & Account Support </span><span className="float-end">24-72 hours</span></li>
                        <li>If additional verification is required, the timeline may be extended, and customers will be informed.</li>
                    </ul>

                </>
            )
        },
        {
            title: '4. Complaint Handling for Specific Cases',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Digital Art & 3D Models:Complaints Against Sellers & Products:"
                        points={
                            [
                                "If a seller has provided a defective, incorrect, or counterfeit product, we will investigate the matter.",
                                "If the complaint is valid, appropriate action will be taken, including refunds, exchanges, or seller penalties.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Complaints Against Influencers, Artists, or Job Posters:"
                        points={
                            [
                                "Customers or businesses facing disputes with influencers, artists, or job posters can report issues via LXS Store’s dispute resolution system.",
                                "LXS Store will mediate between both parties and recommend fair solutions.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Complaints Related to Payments & Fraudulent Transactions:"
                        points={
                            [
                                "Customers experiencing unauthorized transactions, failed payments, or refund delays must report the issue immediately.",
                                "We will coordinate with payment gateways and banks to investigate and resolve the issue.",
                            ]
                        }
                    />

                </>
            )
        },
        {
            title: '5. Escalation Process for Unresolved Complaints',
            content: (
                <>
                    <p className="mb-2">
                        If your complaint is not resolved within the given timeframe, you can escalate it:
                    </p>

                    <BulletPointsWithHeading
                        points={
                            [
                                "First Level: Contact our Customer Support Supervisor at [Insert Escalation Email].",
                                "Second Level: If still unresolved, escalate to our Grievance Redressal Officer at [Insert Grievance Officer Email].",
                                "Third Level: Legal escalation under Indian Consumer Protection Laws (if applicable).",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: "6. Customer Support Do’s & Don’ts",
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Do:"
                        points={
                            [
                                "Be clear and provide all necessary details when submitting a complaint.",
                                "Respond promptly to emails and follow instructions given by our team.",
                                "Respect our support representatives and allow time for resolution.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Don't"
                        points={
                            [
                                "Provide false or misleading information to gain an unfair advantage.",
                                "Spam multiple support channels for the same issue.",
                                "Use abusive or threatening language towards support staff.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '7. Fraud & Abuse Policy',
            content: (
                <>
                    <BulletPointsWithHeading
                        points={
                            [
                                "Repeated false complaints may lead to account suspension.",
                                "Any fraudulent activity (e.g., false refund claims, chargebacks, unauthorized transactions) will be reported to authorities.",
                                "Customers or sellers found violating our Terms of Service will be permanently banned.",
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
                        For any concerns, reach out to:
                    </p>

                    <ul className="list-disc list-inside space-y-1 leading-5 pl-14 -indent-[22px]">
                        <li><i className="fi fi-rr-envelope relative top-[2px]"></i> Email: [Insert support email]"</li>
                        <li><i className="fi fi-rr-phone-call relative top-[2px]"></i> Phone: [Insert contact number]"</li>
                        <li><i className="fi fi-rs-comment relative top-[2px]"></i> Live Chat: Available from [X:XX AM – X:XX PM]"</li>
                    </ul>

                    <p className="mt-5">
                        This Customer Support & Complaint Resolution Policy ensures a transparent and fair resolution process for
                        all users. We are here to assist you!
                    </p>
                </>
            )
        },
    ];

    return (
        <div className="w-full mx-auto px-20 py-5">
            <HeadingText name="Customer Support & Complaint Resolution Policy" className="text-[40px]" />
            <p className="text-lg font-medium mb-4">Updated: 22.06.2025</p>
            <p className="mb-4 text-lg leading-6 w-3/4">
                At LXS Store, customer satisfaction is our top priority. This policy explains how you can contact our customer
                support, how we handle complaints, and the resolution process for disputes related to orders, payments,
                returns, seller issues, and more.
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

export default CustomerSupportAndComplaintResolutionPolicy
