import BulletPointsWithHeading from "@/components/BulletPointsWithHeading";
import HeadingText from "@/components/HeadingText";
import { useState } from "react";


function ThirdPartyServiceProviderPolicy() {
    const [openIndex, setOpenIndex] = useState(-1);

    const toggleSection = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    const sections = [
        {
            title: '1. Introduction',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="This policy applies to all users of LXS Store, including:"
                        points={
                            [
                                "Shoppers purchasing products and services.",
                                "Sellers and Artists using our marketplace to list, sell, or license products.",
                                "Job Seekers and Job Posters interacting through our Job Portal.",
                                "Influencers and Creators collaborating with brands.",
                                "Any visitor using features of LXS Store that rely on external service integrations.",
                            ]
                        }
                    />
                    <p className="mb-2">
                    Third-party services enable payments, shipping, marketing, analytics, communication, and other essential functions that keep LXS Store running smoothly.
                    </p>
                </>
            )
        },
        {
            title: '2. Types of Third-Party Service Providers We Use',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="We may work with third parties in the following areas:"
                        points={
                            [
                                "Payment Gateways: To securely process payments and refunds (e.g., Razorpay, UPI, Net Banking).",
                                "Logistics & Shipping Partners: To ensure timely and reliable order deliveries.",
                                "SMS, Email & WhatsApp Services: To send order updates, OTPs, marketing messages, and support communication (e.g., Fast2SMS, WhatsApp Business API).",
                                "Cloud Hosting & Data Storage: To host our platform, maintain uptime, and store user information securely.",
                                "Analytics & Tracking Tools: To monitor website performance, improve usability, and enhance customer experience.",
                                "Advertising & Marketing Platforms: To deliver personalized ads, discounts, and promotions.",
                                "Fraud Prevention & Security Tools: To detect suspicious activity, prevent scams, and protect users.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '3. Information Shared with Service Providers',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Depending on the service, we may share limited personal data with providers, including:"
                        points={
                            [
                                "Contact details (name, phone number, email, shipping address).",
                                "Transaction details (order amount, payment status, refund details).",
                                "Usage data (cookies, browsing behavior, analytics insights).",
                            ]
                        }
                    />
                    <p className="mb-2">
                    We only share the information strictly necessary for the service to be performed. Sensitive data, such as card details, are handled directly by secure payment gateways and are not stored by LXS Store.
                    </p>
                </>
            )
        },
        {
            title: '4. Responsibilities of Third-Party Providers',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="All third-party service providers engaged by LXS Store are required to:"
                        points={
                            [
                                "Comply with applicable laws and data protection regulations.",
                                "Maintain strong security measures to protect user information.",
                                "Use shared data only for the intended purpose agreed with LXS Store.",
                                "Refrain from selling or misusing user data in any manner.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '5. Limitations of Liability',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="While we carefully vet and partner with trusted providers, LXS Store is not responsible for:"
                        points={
                            [
                                "Service interruptions caused by third-party providers.",
                                "Data breaches, errors, or delays directly attributable to third-party systems.",
                                "The content, policies, or actions of independent third-party websites linked through our platform.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '6. Your Choices',
            content: (
                <>
                    <BulletPointsWithHeading
                        points={
                            [
                                "Users may opt out of certain marketing or analytics tracking by adjusting browser and cookie preferences.",
                                "However, opting out of essential third-party services (such as payment or shipping providers) may affect your ability to use LXS Store fully."
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '7. Changes to This Policy',
            content: (
                <>
                    <p className="mb-2">
                    We may update this Third-Party Service Provider Policy periodically. Updates will be reflected with a new “Last Updated” date.
                    </p>
                </>
            )
        },
        {
            title: '8. Contact Us',
            content: (
                <>
                    <p className="mb-2">
                        For questions about this policy or cookie usage, please reach out to us: <br /> <br />
                        📧 Email: support@lxslifestylestore.com <br />
                        📞 Phone: +91 8987888368 <br /> <br />
                        Thank you for trusting LXS Store with your online shopping and marketplace experience! 🚀
                    </p>
                </>
            )
        }
    ];

    return (
        <div className="w-full mx-auto px-20 py-5">
            <HeadingText name="Third-Party Service Provider Policy for LXS Store" className="text-[40px]" />
            <p className="text-lg font-medium mb-4">Updated: 22.06.2025</p>
            <p className="mb-4 text-lg leading-6 w-full">
            At LXS Store, we work with trusted third-party service providers to deliver a seamless, secure, and efficient experience for our users. This Third-Party Service Provider Policy explains how we engage with external partners, what services they provide, and how your information may be shared in the process. By using LXS Store, you acknowledge and agree to the involvement of third-party service providers as outlined in this policy.
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

export default ThirdPartyServiceProviderPolicy
