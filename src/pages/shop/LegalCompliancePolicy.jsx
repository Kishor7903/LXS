import BulletPointsWithHeading from "@/components/BulletPointsWithHeading";
import HeadingText from "@/components/HeadingText";
import { useState } from "react";


function LegalCompliancePolicy() {
    const [openIndex, setOpenIndex] = useState(-1);

    const toggleSection = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    const sections = [
        {
            title: '1. Compliance with Laws & Regulations',
            content: (
                <>
                    <p className="mb-2">
                        LXS Store complies with all local, national, and international laws governing e-commerce, consumer
                        protection, intellectual property, taxation, employment, and data privacy.
                    </p>

                    <BulletPointsWithHeading
                        heading="Consumer Protection & E-Commerce Laws:"
                        points={
                            [
                                "We follow all applicable consumer protection laws to ensure fair business practices.",
                                "All product descriptions, pricing, and promotions are truthful and not misleading.",
                                "Our policies (Return & Refund, Exchange, Shipping, etc.) comply with government e-commerce guidelines.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Data Protection & Privacy Laws:"
                        points={
                            [
                                "We strictly adhere to data protection laws, including the General Data Protection Regulation (GDPR), Indian IT Act 2000, and other relevant laws.",
                                "Customer data is collected, stored, and processed securely, ensuring privacy and confidentiality.",
                                "Users have the right to access, modify, or delete their personal information as per our Privacy Policy.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Intellectual Property Laws:"
                        points={
                            [
                                "We respect copyright, trademarks, and intellectual property rights.",
                                "Any unauthorized use, reproduction, or distribution of copyrighted content is strictly prohibited.",
                                "Sellers, artists, and influencers must only upload and sell original content or have the rights to use it.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Taxation & Financial Compliance:"
                        points={
                            [
                                "We comply with all tax regulations, including GST (India), VAT, and other applicable international taxes.",
                                "All payments and financial transactions are legally recorded and processed securely.",
                                "Sellers and businesses using our platform must ensure their own tax compliance based on their region.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Employment & Labor Laws:"
                        points={
                            [
                                "LXS Store follows fair employment policies and does not support child labour, forced labour, or discrimination.",
                                "Influencers, freelancers, and employees working with LXS Store receive fair wages and contracts per labour laws.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '2. Compliance for Sellers, Artists & Influencers',
            content: (
                <>
                    <p className="mb-2">
                        All sellers, artists, and influencers using the LXS Store platform must follow legal and ethical business
                        practices.
                    </p>

                    <BulletPointsWithHeading
                        heading="Seller & Vendor Compliance:"
                        points={
                            [
                                "Products listed must be legally sourced, non-counterfeit, and comply with safety regulations.",
                                "Sellers must provide accurate product details and not misrepresent their offerings.",
                                "All sellers must comply with advertising, marketing, and pricing transparency laws.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Artist & Marketplace Compliance:"
                        points={
                            [
                                "Artists must ensure that their work does not infringe on copyrights or trademarks.",
                                "All artworks, designs, and NFTs must comply with legal ownership and licensing agreements.",
                                "Artworks containing sensitive, offensive, or illegal content will be removed.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Influencer & Affiliate Compliance:"
                        points={
                            [
                                "Influencers must disclose partnerships and follow advertising laws such as FTC (USA) & ASCI (India) guidelines.",
                                "False advertising, deceptive promotions, or misleading endorsements are strictly prohibited.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '3. Prohibited Activities',
            content: (
                <>
                    <p className="mb-2">
                        LXS Store does not allow any illegal or unethical activities on its platform.
                    </p>

                    <BulletPointsWithHeading
                        heading="The following are strictly prohibited:"
                        points={
                            [
                                "Selling counterfeit, illegal, stolen, or restricted products.",
                                "Engaging in fraudulent transactions, including false reviews or fake orders.",
                                "Violating data privacy by misusing customer information.",
                                "Selling banned substances, weapons, or prohibited digital content.",
                                "Harassment, hate speech, or discriminatory behaviour towards users.",
                                "Attempting to bypass LXS Store's transaction process (direct sales without using our platform).",
                            ]
                        }
                    />

                    <p className="mt-5">
                        Violations may result in account suspension, termination, and legal action.
                    </p>
                </>
            )
        },
        {
            title: '4. Legal Compliance for Customers',
            content: (
                <>
                    <BulletPointsWithHeading
                        points={
                            [
                                "LXS Store customers must comply with our Terms & Conditions and applicable laws when using our platform.",
                                "Customers must provide accurate personal and payment details.",
                                "Misuse of promo codes, rewards, or return policies is prohibited.",
                                "Customers must not engage in fraudulent chargebacks or false claims.",
                                "Abusive behaviour toward sellers, influencers, or support staff is not tolerated.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '5. Legal Dispute Resolution',
            content: (
                <>
                    <BulletPointsWithHeading
                        points={
                            [
                                "Dispute Handling: Any legal disputes will be resolved through mutual discussions, arbitration, or legal proceedings as per applicable laws.",
                                "Jurisdiction: All legal matters shall be governed by the laws of [Insert Country/State].",
                                "Contractual Agreements: Users engaging in business collaborations, employment, or affiliate partnerships with LXS Store may be required to sign legally binding contracts.",
                            ]
                        }
                    />

                    <ul className="list-disc list-inside space-y-1 leading-5 pl-14 -indent-[22px]">

                    </ul>
                </>
            )
        },
        {
            title: '6. Compliance Audits & Policy Updates',
            content: (
                <>
                    <BulletPointsWithHeading
                        points={
                            [
                                "LXS Store conducts regular audits to ensure compliance with all legal requirements.",
                                "This policy may be updated as per legal changes, and users will be notified of any significant modifications.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: "7. Reporting Legal Concerns",
            content: (
                <>
                    <p className="mb-2">
                        If you suspect any violations of laws, fraud, or unethical activities on our platform, please contact us:
                    </p>

                    <ul className="list-disc list-inside space-y-1 leading-5 pl-14 -indent-[22px]">
                        <li><i className="fi fi-rr-envelope relative top-[2px]"></i> Email: [Insert support email]"</li>
                        <li><i className="fi fi-rr-phone-call relative top-[2px]"></i> Phone: [Insert contact number]"</li>
                        <li><i className="fi fi-rs-comment relative top-[2px]"></i> Live Chat: Available from [X:XX AM – X:XX PM]"</li>
                    </ul>
                    
                    <p className="mt-5">
                        We are committed to legal integrity and transparency, ensuring a safe, lawful, and trustworthy platform for
                        all users.
                    </p>
                </>
            )
        },
    ];
    return (
        <div className="w-full mx-auto px-20 py-5">
            <HeadingText name="Legal Compliance Policy" className="text-[40px]" />
            <p className="text-lg font-medium mb-2">Updated: 22.06.2025</p>
            <p className="mb-4 text-lg leading-6 w-3/4">
                At LXS Store, we are committed to conducting our business with integrity, transparency, and full compliance
                with all applicable laws and regulations. This Legal Compliance Policy ensures that our operations, products,
                services, and interactions with customers, sellers, influencers, and business partners adhere to legal
                standards.
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

export default LegalCompliancePolicy
