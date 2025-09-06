import BulletPointsWithHeading from "@/components/BulletPointsWithHeading";
import HeadingText from "@/components/HeadingText";
import { useState } from "react";


function LimitationOfLiabilityAndDisclaimerPolicy() {
    const [openIndex, setOpenIndex] = useState(-1);

    const toggleSection = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    const sections = [
        {
            title: '1. General Disclaimer',
            content: (
                <>
                    <p className="mb-2">
                    LXS Store (operated by LXSLIFESTYLESTORE (OPC) PRIVATE LIMITED) provides an **online marketplace platform** connecting buyers, sellers, artists, job seekers, job posters, creators, and influencers.
                    </p>
                    <BulletPointsWithHeading
                        points={
                            [
                                "We **do not manufacture, own, or control** the products, artworks, or job listings uploaded by third-party sellers, artists, or employers.",
                                "Product quality, authenticity, availability, pricing, and descriptions are the responsibility of the respective seller, artist, or brand.",
                                "While we make reasonable efforts to verify sellers and ensure safe usage, we cannot guarantee that all content, listings, or services will always meet user expectations.",
                            ]
                        }
                    />
                    
                </>
            )
        },
        {
            title: '2. Limitation of Liability',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="To the maximum extent permitted by law:"
                        points={
                            [
                                "Indirect Damages**: LXS Store shall not be liable for any indirect, incidental, consequential, or punitive damages (including loss of profits, data, or goodwill) arising from your use of the platform.",
                                "Service Interruptions**: We are not responsible for downtime, delays, errors, or interruptions caused by technical issues, server failures, maintenance, or third-party service providers.",
                                "Third-Party Actions**: We are not liable for any acts, omissions, or negligence of third-party service providers (payment gateways, shipping partners, communication platforms, advertisers, etc.).",
                                "User Misconduct**: We are not responsible for fraudulent activities, misrepresentation, intellectual property violations, or illegal actions carried out by sellers, buyers, employers, influencers, or other users.",
                                "Force Majeure**: We are not liable for delays or failures caused by events beyond our control, including natural disasters, strikes, government actions, internet outages, or pandemics.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '3. Product, Service & Content Disclaimer',
            content: (
                <>
                    <BulletPointsWithHeading
                        points={
                            [
                                "Product Information**: Product images, descriptions, specifications, and prices are provided by sellers and may differ from actual products received.",
                                "Third-Party Content**: Advertisements, job listings, influencer campaigns, and artwork are uploaded by users or partners, and LXS Store does not guarantee their accuracy or reliability.",
                                "Health & Safety Products**: LXS Store is not responsible for the misuse of products (including apparel, accessories, or creative goods) that may cause harm due to incorrect usage or lack of adherence to provided instructions.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '4. No Guarantee of Result',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="LXS Store does not guarantee specific outcomes, including:"
                        points={
                            [
                                "Employment or hiring success via the Job Portal.",
                                "Sales growth or visibility for sellers, artists, or influencers.",
                                "Specific delivery timelines if impacted by external logistics partners.",
                                "Uninterrupted or error-free access to the website and services.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '5. User Responsibility',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="By using LXS Store, you agree that:"
                        points={
                            [
                                "You are solely responsible for verifying product details, seller credibility, and job postings before making decisions.",
                                "You must use your account responsibly and not engage in fraudulent or unlawful activities.",
                                "You should maintain updated security (e.g., strong passwords, safe devices) when using our platform.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '6. Legal Compliance',
            content: (
                <>
                    <p className="mb-2">
                    Nothing in this policy excludes or limits liability where such exclusion is prohibited by law (e.g., consumer protection rights under applicable Indian laws).
                    </p>
                </>
            )
        },
        {
            title: '7. Changes to This Policy',
            content: (
                <>
                    <p className="mb-2">
                    We may revise this Limitation of Liability & Disclaimer Policy from time to time. Updates will be reflected with a new “Last Updated” date.
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
                        Thank you for trusting LXS Store! 🚀
                    </p>
                </>
            )
        }
    ];

    return (
        <div className="w-full mx-auto px-20 py-5">
            <HeadingText name="Limitation of Liability & Disclaimer Policy for LXS Store" className="text-[40px]" />
            <p className="text-lg font-medium mb-4">Updated: 22.06.2025</p>
            <p className="mb-4 text-lg leading-6 w-full">
            At LXS Store, we are committed to providing a safe, reliable, and enjoyable shopping and marketplace experience. However, certain risks and limitations apply to the use of our website, services, and third-party integrations. This Limitation of Liability & Disclaimer Policy outlines the scope of our responsibilities and the limits of our liability. By using LXS Store, you acknowledge and accept the terms of this policy.
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

export default LimitationOfLiabilityAndDisclaimerPolicy
