import BulletPointsWithHeading from "@/components/BulletPointsWithHeading";
import HeadingText from "@/components/HeadingText";
import { useState } from "react";

function CustomerSupportAndCustomerDisputeResolutionPolicy() {
    const [openIndex, setOpenIndex] = useState(-1);

    const toggleSection = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    const sections = [
        {
            title: '1. Customer Support Services',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Support Channels:"
                        subHeading="LXS Store offers multiple ways to get assistance:"
                        points={
                            [
                                "Email Support: [Insert Support Email]",
                                "Live Chat Support: Available from [X:XX AM – X:XX PM]",
                                "Phone Support: [Insert Contact Number]",
                                "Help Centre & FAQs: [Insert Link to Help Centre]",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Support Availability:"
                        points={
                            [
                                "Our support team is available [Insert Days & Hours].",
                                "Response times may vary based on query complexity, but we aim to resolve issues within 24-48 hours.",
                            ]
                        }
                    />

                </>
            )
        },
        {
            title: '2. Types of Customer Support Issues Handled',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Our support team assists with:"
                        points={
                            [
                                "Order & Payment Issues: Payment failures, incorrect charges, refunds, and checkout problems.",
                                "Shipping & Delivery Issues: Late deliveries, tracking issues, damaged products upon arrival.",
                                "Returns, Refunds & Exchanges: Guidance on return eligibility and processing refunds.",
                                "Product Issues: Defective, incorrect, or missing items.",
                                "Account & Login Issues: Password resets, profile updates, security concerns.",
                                "LXS Rewards & Discounts: Questions about points, loyalty programs, and promo codes.",
                                "Marketplace & Seller Support: Assistance for sellers, artists, influencers, and job posters.",
                                "Legal & Compliance Issues: Intellectual property concerns, policy violations, fraud, and disputes.",
                            ]
                        }
                    />
                    <p className="mt-5">
                        For quick assistance, please check our FAQs before reaching out to support.
                    </p>
                </>
            )
        },
        {
            title: '3. Dispute Resolution Process',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Raising a Dispute:"
                        subHeading="If you have a complaint or dispute regarding an order, transaction, or service, you can raise it through:"
                        points={
                            [
                                "Support Ticket: Submit via our [Help Centre] with full details.",
                                "Email Support: Send a complaint with order details and evidence.",
                                "Live Chat: Speak to a representative for quick assistance.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Dispute Resolution Timeline:"
                        points={
                            [
                                "Acknowledgment: We acknowledge disputes within 24 hours.",
                                "Investigation: Our team reviews complaints, including reviewing order history, transaction records, and communication logs.",
                                "Resolution Proposal: A solution is provided within 5-7 business days.",
                                "Final Decision: If accepted, the resolution is executed; otherwise, further escalation is available.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Escalation Process:"
                        points={
                            [
                                "If a dispute is not resolved satisfactorily, it can be escalated to a senior manager.",
                                "For severe disputes, we may involve third-party mediators or legal authorities.",
                            ]
                        }
                    />

                </>
            )
        },
        {
            title: '4. Seller & Marketplace Disputes',
            content: (
                <>
                    <BulletPointsWithHeading
                        points={
                            [
                                "Sellers must follow our marketplace policies to ensure fair transactions.",
                                "Any disputes between buyers and sellers will be handled by LXS Store as a mediator.",
                                "Sellers found violating policies may face penalties, account suspension, or removal from the platform.",
                            ]
                        }
                    />

                    <p className="mt-5">
                        Refer to our [Marketplace & Seller Policies] for more details.
                    </p>
                </>
            )
        },
        {
            title: '5. Fraud Prevention & Policy Violations',
            content: (
                <>
                    <BulletPointsWithHeading
                        points={
                            [
                                "Fraudulent orders, chargebacks, or misuse of policies will result in account restrictions.",
                                "Fake claims or abuse of our support system may lead to permanent account suspension.",
                                "LXS Store reserves the right to refuse service, cancel orders, or take legal action in case of fraudulent disputes.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: "6. Legal Dispute Handling",
            content: (
                <>
                    <BulletPointsWithHeading
                        points={
                            [
                                "If a dispute cannot be resolved amicably, customers or sellers may seek legal recourse as per applicable laws.",
                                "All legal matters will be governed under the jurisdiction of [Insert Country/State].",
                                "Mediation or arbitration may be required before pursuing legal action.",
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
            title: '7. Customer Responsibilities',
            content: (
                <>
                    <BulletPointsWithHeading
                        points={
                            [
                                "Customers must provide accurate and truthful information in complaints.",
                                "Disputes must be raised within 30 days of the issue occurring.",
                                "Customers should check product descriptions, policies, and FAQs before making claims.",
                            ]
                        }
                    />
                    
                </>
            )
        },
        {
            title: '8. Policy Updates',
            content: (
                <>
                    <BulletPointsWithHeading
                        points={
                            [
                                "LXS Store reserves the right to modify this policy based on operational and legal requirements.",
                                "Customers will be notified of significant changes via email or website announcements.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '9. Contact Us for Support & Disputes',
            content: (
                <>
                    <p className="mb-2">
                        For assistance, reach out to:
                    </p>

                    <ul className="list-disc list-inside space-y-1 leading-5 pl-14 -indent-[22px]">
                        <li><i className="fi fi-rr-envelope relative top-[2px]"></i> Email: [Insert support email]"</li>
                        <li><i className="fi fi-rr-phone-call relative top-[2px]"></i> Phone: [Insert contact number]"</li>
                        <li><i className="fi fi-rs-comment relative top-[2px]"></i> Live Chat: Available from [X:XX AM – X:XX PM]"</li>
                    </ul>

                    <p className="mt-5">
                        We are dedicated to resolving your concerns fairly and efficiently at LXS Store.
                    </p>
                </>
            )
        },
    ];

    return (
        <div className="w-full mx-auto px-20 py-5">
            <HeadingText name="Customer Support & Dispute Resolution Policy" className="text-[40px]" />
            <p className="text-lg font-medium mb-4">Updated: 22.06.2025</p>
            <p className="mb-4 text-lg leading-6 w-3/4">
                At LXS Store, we are committed to providing top-notch customer support and ensuring smooth resolution of
                disputes. This policy outlines how customers, sellers, artists, influencers, and businesses can seek support,
                raise complaints, and resolve disputes in a fair and transparent manner.
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

export default CustomerSupportAndCustomerDisputeResolutionPolicy
