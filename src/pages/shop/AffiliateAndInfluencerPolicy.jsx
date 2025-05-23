import BulletPointsWithHeading from "@/components/BulletPointsWithHeading";
import HeadingText from "@/components/HeadingText";
import { useState } from "react";

function AffiliateAndInfluencerPolicy() {
    const [openIndex, setOpenIndex] = useState(-1);

    const toggleSection = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    const sections = [
        {
            title: '1. Overview of the Program',
            content: (
                <>
                    <p className="mb-2">
                        LXS Store’s Affiliate & Influencer Program allows individuals, content creators, influencers, and marketers to
                        promote our products and earn commissions based on successful referrals.
                    </p>

                    <BulletPointsWithHeading
                        heading="Who Can Join?"
                        points={
                            [
                                "Social media influencers (YouTube, Instagram, TikTok, etc.).",
                                "Bloggers & content creators.",
                                "Affiliate marketers.",
                                "Website owners with relevant traffic.",
                                "Businesses & brands looking to collaborate.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="How It Works:"
                        points={
                            [
                                "Apply to the program through our Affiliate/Influencer Sign-Up Page.",
                                "Get approved and receive a unique referral/affiliate link.",
                                "Share your link via blogs, social media, or other platforms.",
                                "Earn a commission for every sale generated through your referral.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '2. Commission Structure & Payments',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Commission Rates:"
                        points={
                            [
                                "Standard Commission: Up to X% per sale (depends on product category).",
                                "Higher Tiers: Influencers with large audiences may receive customized rates.",
                                "Special Promotions: Extra incentives for seasonal campaigns.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Payment Terms:"
                        points={
                            [
                                "Payments are processed monthly (minimum payout threshold: ₹X/$X).",
                                "Payments are made via PayPal, Bank Transfer, or Store Credit.",
                                "Commissions are credited only after the return/refund period expires.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '3. Affiliate & Influencer Responsibilities',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Ethical Promotion:"
                        points={
                            [
                                "Promote LXS Store truthfully and transparently.",
                                "Clearly disclose sponsorships or affiliate relationships in content.",
                                "Create original content that aligns with our brand values.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Prohibited Activities:"
                        points={
                            [
                                "False Advertising: No misleading claims about products.",
                                "Spamming: No unsolicited emails or excessive social media posts.",
                                "Fraudulent Orders: No self-referrals or fake transactions.",
                                "Trademark Violations: No unauthorized use of LXS Store branding.",
                                "Discount Code Misuse: Do not share private coupon codes publicly.",
                            ]
                        }
                    />

                </>
            )
        },
        {
            title: '4. Content Guidelines',
            content: (
                <>
                    <BulletPointsWithHeading
                        points={
                            [
                                "High-Quality Content: Images/videos should be clear and professional.",
                                "No Offensive Material: No hate speech, discrimination, or explicit content.",
                                "Correct Branding: Use only official LXS Store logos and graphics.",
                                "Platform Compliance: Follow the terms of YouTube, Instagram, TikTok, etc.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '5. Account Suspension & Termination',
            content: (
                <>
                    <p className="mb-2">
                        LXS Store reserves the right to suspend or terminate accounts if:
                    </p>

                    <BulletPointsWithHeading
                        points={
                            [
                                "Fraudulent activities are detected.",
                                "The influencer/affiliate violates platform policies.",
                                "No referral sales are generated within X months.",
                                "Negative brand reputation is caused.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '6. Program Modifications',
            content: (
                <>
                    <BulletPointsWithHeading
                        points={
                            [
                                "LXS Store may change commission rates, payout structures, or policies at any time.",
                                "Participants will be notified of major updates via email or dashboard announcements.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '7. Contact & Support',
            content: (
                <>
                    <p className="mb-2">
                        For questions or support related to our Affiliate & Influencer Program, contact us:
                    </p>

                    <ul className="list-disc list-inside space-y-1 leading-5 pl-14 -indent-[22px]">
                        <li><i className="fi fi-rr-envelope relative top-[2px]"></i> Email: [Insert support email]"</li>
                        <li><i className="fi fi-rr-phone-call relative top-[2px]"></i> Phone: [Insert contact number]"</li>
                        <li><i className="fi fi-rs-comment relative top-[2px]"></i> Live Chat: Available from [X:XX AM – X:XX PM]"</li>
                    </ul>

                    <p className="mt-5">
                        This Affiliate & Influencer Policy ensures a fair, transparent, and profitable partnership between LXS Store and
                        our affiliates/influencers.
                    </p>
                </>
            )
        },
    ];

    return (
        <div className="w-full mx-auto px-20 py-5">
            <HeadingText name="Affiliate & Influencer Policy" className="text-[40px]" />
            <p className="text-lg font-medium mb-4">Updated: 22.06.2025</p>
            <p className="mb-4 text-lg leading-6 w-3/4">
                At LXS Store, we value the power of influencers and affiliates in spreading the word about our brand. This
                policy outlines the terms, responsibilities, and guidelines for those who participate in our Affiliate & Influencer
                Program. By joining our program, you agree to comply with these terms.
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

export default AffiliateAndInfluencerPolicy
