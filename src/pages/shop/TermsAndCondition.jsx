import BulletPointsWithHeading from "@/components/BulletPointsWithHeading";
import HeadingText from "@/components/HeadingText";
import { useState } from "react";


function TermsAndCondition() {
    const [openIndex, setOpenIndex] = useState(-1);

    const toggleSection = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    const sections = [
        {
            title: '1. Definitions',
            content: (
                <>
                    <p className="mb-2">
                        "LXS Store" refers to our website, online marketplace, and all associated services, including e-commerce, job
                        listings, art marketplace, and influencer collaborations.
                    </p>

                    <BulletPointsWithHeading
                        points={
                            [
                                "User: refers to any individual or entity that accesses, browses, or interacts with our platform.",
                                "Buyer: refers to users who purchase products, digital goods, or services through the LXS Store platform.",
                                "Seller: refers to users who list and sell products on our platform, including third-party vendors and businesses.",
                                "Artist: refers to users who list and sell artwork in the art marketplace, including digital and physical creations.",
                                "Job Poster: refers to individuals, companies, or organizations posting job listings on the platform.",
                                "Job Seeker: refers to individuals applying for job opportunities listed on LXS Store.",
                                "Influencer: refers to social media personalities and content creators registered on our influencer marketplace for brand collaborations.",
                                "Company: refers to businesses utilizing the platform for hiring, influencer marketing, or selling products and services.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '2. Eligibility & Account Registration',
            content: (
                <>
                    <p className="mb-2">
                        To ensure the security and credibility of our platform, we have specific eligibility and account requirements:
                    </p>

                    <BulletPointsWithHeading
                        points={
                            [
                                "Users must be at least 18 years old to register for an account and engage in transactions on our platform.",
                                "During registration, users must provide accurate, up-to-date, and verifiable personal or business information.",
                                "Users are solely responsible for maintaining the security and confidentiality of their login credentials.",
                                "Any unauthorized access to an account should be reported to LXS Store immediately.",
                            ]
                        }
                    />

                    <p className="mt-5">
                        LXS Store reserves the right to suspend or terminate accounts that violate these Terms or engage in
                        fraudulent, abusive, or unlawful activities.
                    </p>
                </>
            )
        },
        {
            title: '3. Use of Our Services',
            content: (
                <>
                    <p className="mb-2">
                        By using LXS Store, you agree to abide by the following usage policies:
                    </p>

                    <BulletPointsWithHeading
                        heading="Permitted Uses:"
                        points={
                            [
                                "You may use our platform for lawful purposes only.",
                                "You may browse, purchase, sell, apply for jobs, list jobs, collaborate as an influencer, or engage in marketplace transactions as intended.",
                                "You must comply with all applicable local, national, and international laws and regulations.",
                                "You may post honest reviews and feedback regarding products, services, and sellers.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Prohibited Activities:"
                        points={
                            [
                                "Harassment, fraud, or abusive behaviour toward other users, sellers, or employees is strictly prohibited.",
                                "Unauthorized reselling, hacking, or data scraping is strictly prohibited.",
                                "Misrepresentation of identity, qualifications, or products is not allowed.",
                                "Posting or selling illegal, counterfeit, or infringing products is not permitted.",
                                "Circumventing the platform's fees (e.g., avoiding transaction fees for influencer collaborations) is not allowed.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '4. Shopping & Orders',
            content: (
                <>
                    <p className="mb-2">
                        Our marketplace connects buyers and sellers worldwide, ensuring seamless transactions.
                    </p>

                    <BulletPointsWithHeading
                        heading="Product Listings & Purchases:"
                        points={
                            [
                                "Product descriptions, images, and pricing are provided by sellers and may change without prior notice.",
                                "Prices are listed in The Indian Rupee (symbol: ₹; code: INR) and additional charges like taxes and shipping fees may apply.",
                                "Adding an item to your cart does not guarantee availability. Stock confirmation is provided upon completing checkout.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Payments & Refunds:"
                        points={
                            [
                                "Payments must be made using approved payment methods such as PayPal, credit/debit cards, or other secure gateways.",
                                "Refund and return policies vary by seller, always review the refund policy before purchasing.",
                                "If a dispute arises, LXS Store may assist in mediation, but we are not liable for seller-buyer conflicts.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '5. Seller & Artist Policies',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Seller Requirements:"
                        points={
                            [
                                "Sellers must provide accurate business details, including contact information and tax compliance if applicable.",
                                "Products must comply with LXS Store’s quality standards, ensuring authenticity and proper descriptions.",
                                "Counterfeit or illegal products are strictly prohibited and may result in legal action.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Artwork Listings:"
                        points={
                            [
                                "Artists retain ownership of their original artwork but grant LXS Store the right to display and promote their work.",
                                "Listings must clearly specify licensing terms, including usage rights for digital and physical artwork.",
                                "Plagiarized artwork is not allowed and will result in account suspension.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '6. Job Listings & Hiring',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Job Posters(Companies / Employers):"
                        points={
                            [
                                "Job listings must be accurate, complete, and non - misleading.",
                                "Employers must not discriminate based on race, gender, age, or any other protected category.",
                                "Fake job postings or misleading employment offers will result in immediate removal and potential legal action.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Job Seekers:"
                        points={
                            [
                                "Applicants must provide honest and accurate information in job applications.",
                                "LXS Store is not responsible for employment decisions made by companies.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: "7. Influencer Marketplace",
            content: (
                <>
                    <BulletPointsWithHeading
                        points={
                            [
                                "Influencers and brands must comply with advertising and disclosure laws.",
                                "Collaboration terms must be clearly defined before agreements.",
                                "LXS Store is not responsible for disputes regarding payment or deliverables.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '8. User-Generated Content',
            content: (
                <>
                    <p className="mb-2">
                        Users may submit reviews, artwork, job listings, and other content. <br />
                        LXS Store reserves the right to remove any content violating our guidelines.
                    </p>
                    <BulletPointsWithHeading
                        heading="Prohibited Content:"
                        points={
                            [
                                "Hate speech, violence, or illegal activities.",
                                "Fraudulent product listings or misleading job postings.",
                                "Unauthorized use of copyrighted or trademarked material.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: "9. Intellectual Property",
            content: (
                <>
                    <BulletPointsWithHeading
                        points={
                            [
                                "LXS Store owns all trademarks, logos, and branding elements.",
                                "Users retain ownership of their original content but grant LXS Store a license to display and promote it.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '10. Termination & Suspension',
            content: (
                <>
                    <p className="mb-2">
                        We reserve the right to suspend or terminate accounts that:
                    </p>

                    <BulletPointsWithHeading
                        points={
                            [
                                "Violate these Terms & Conditions.",
                                "Engage in fraudulent, abusive, or illegal activities.",
                                "Repeatedly receive complaints or disputes.",
                                "Users may request account deletion by contacting customer support.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: "11. Disclaimers & Limitations of Liability",
            content: (
                <>
                    <BulletPointsWithHeading
                        points={
                            [
                                "We do not guarantee that products, jobs, or influencer campaigns will meet expectations.",
                                "We are not liable for third-party actions.",
                                "Our liability is limited to the amount paid by the user for any disputed transaction.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: "12. Governing Law & Dispute Resolution",
            content: (
                <>
                    <BulletPointsWithHeading
                        points={
                            ["These Terms are governed by the laws of Jharkhand, India.",
                                "Unresolved disputes will be handled in the competent courts of Jharkhand.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: "13. Changes to These Terms",
            content: (
                <>
                    <BulletPointsWithHeading
                        points={
                            [
                                "We may update these Terms at any time.",
                                "Continued use of LXS Store after updates constitutes acceptance of the new Terms.",
                            ]
                        }
                    />
                </>
            )
        },
    ];
    return (
        <div className="w-full mx-auto px-20 py-5">
            <HeadingText name="Terms And Conditions" className="text-[40px]" />
            <p className="text-lg font-medium mb-2">Updated: 22.06.2025</p>
            <p className="mb-4 text-lg leading-6 w-3/4">
                Welcome to LXS Store! These Terms & Conditions ("Terms") outline the rules and regulations governing your
                use of our website, marketplace, and services. By accessing or using LXS Store, you agree to comply with and
                be bound by these Terms. If you do not agree with any part of these Terms, please refrain from using our
                platform.
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

export default TermsAndCondition
