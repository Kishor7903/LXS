import BulletPointsWithHeading from "@/components/BulletPointsWithHeading";
import HeadingText from "@/components/HeadingText";
import { useState } from "react";

function CommunityGuidelinesAndUserGeneratedContentPolicy() {
    const [openIndex, setOpenIndex] = useState(-1);

    const toggleSection = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    const sections = [
        {
            title: '1. Scope of This Policy',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="This policy applies to all user-generated content (UGC), including but not limited to:"
                        points={
                            [
                                "Product Reviews & Ratings",
                                "Comments & Discussions",
                                "Uploaded Photos & Videos",
                                "Seller & Artist Listings",
                                "Job Posts & Applications",
                                "Social Media Interactions",
                                "Influencer Collaborations & Promotions",
                            ]
                        }
                    />

                    <p className="mt-5">
                        All users are responsible for the content they post and must ensure it aligns with LXS Store’s values and
                        policies.
                    </p>

                </>
            )
        },
        {
            title: '2. General Community Guidelines',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Respectful & Inclusive Behaviour:"
                        points={
                            [
                                "Be respectful and courteous to all members.",
                                "Avoid personal attacks, discrimination, or offensive language.",
                                "Embrace diversity—no hate speech, harassment, or bullying.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Authentic & Honest Contributions:"
                        points={
                            [
                                "Only post genuine and truthful reviews, experiences, and feedback.",
                                "Do not manipulate product ratings or submit fake reviews.",
                                "Disclose any paid partnerships or sponsorships when promoting products.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="No Harmful, Illegal, or Offensive Content:"
                        points={
                            [
                                "No profanity, slurs, or sexually explicit material.",
                                "No illegal, fraudulent, or misleading content.",
                                "No violence, self-harm encouragement, or threats.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '3. User-Generated Content (UGC) Guidelines',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Product Reviews & Ratings:"
                        points={
                            [
                                "Reviews must be based on actual experiences with the product.",
                                "No spam, fake, or misleading reviews (e.g., paid or incentivized ratings).",
                                "Constructive criticism is welcome, but no abusive language.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Seller & Artist Listings:"
                        points={
                            [
                                "All listings must include accurate product/service descriptions.",
                                "Sellers & artists must own the rights to the images/content they upload.",
                                "No counterfeit, pirated, or stolen content is allowed.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Job Postings & Applications:"
                        points={
                            [
                                "Job posts must provide clear, honest, and legal job opportunities.",
                                "No misleading, fake, or scam job postings are allowed.",
                                "Job applicants must submit real qualifications and portfolios.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Influencer & Social Media Content:"
                        points={
                            [
                                "All influencer collaborations must follow ethical promotion standards.",
                                "No false advertising or exaggerated claims about products.",
                                "Influencers must disclose sponsored partnerships.",
                            ]
                        }
                    />

                </>
            )
        },
        {
            title: '4. Prohibited Content & Activities',
            content: (
                <>
                    <BulletPointsWithHeading
                        points={
                            [
                                "Spam & Self-Promotion: Do not post excessive promotions, irrelevant links, or repeated advertisements.",
                                "Plagiarism & Copyright Violations: Do not post content that belongs to someone else without permission.",
                                "Hate Speech & Discrimination: No racist, sexist, homophobic, or any other discriminatory content.",
                                "Fraudulent Activity: No misleading job posts, fake reviews, or manipulated ratings.",
                                "Phishing & Scams: No deceptive links, impersonation, or malicious software.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '5. Content Moderation & Reporting',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="How We Moderate Content:"
                        points={
                            [
                                "Automated filters detect offensive or prohibited content.",
                                "Manual review by LXS Store’s moderation team.",
                                "Community flagging allows users to report inappropriate content.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="How to Report Violations:"
                        subHeading='If you find any harmful or inappropriate content, report it by:'
                    />
                    <ul className="list-disc list-inside space-y-1 leading-5 pl-14 -indent-[22px]">
                        <li><i className="fi fi-rr-envelope relative top-[2px]"></i> Email: [Insert support email]"</li>
                        <li><i className="fi fi-rr-phone-call relative top-[2px]"></i> Phone: [Insert contact number]"</li>
                        <li><i className="fi fi-rs-comment relative top-[2px]"></i> Live Chat: Available from [X:XX AM – X:XX PM]"</li>
                    </ul>
                    <p className="mt-5">
                        We review reports within 48 hours and take necessary action.
                    </p>
                </>
            )
        },
        {
            title: "6. Ownership & Rights to User Content",
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="By submitting UGC to LXS Store, users:"
                        points={
                            [
                                "Grant LXS Store a non-exclusive, royalty-free, worldwide license to use, modify, and share the content.",
                                "Confirm they have the legal right to post the content.",
                                "Understand that LXS Store may remove or modify content that violates guidelines.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '7. Consequences of Violating Guidelines',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Violations may result in:"
                        points={
                            [
                                "Content removal without notice.",
                                "Warnings or temporary account suspension.",
                                "Permanent ban from LXS Store for serious/repeated offenses.",
                                "For severe violations, legal action may be taken.",
                            ]
                        }
                    />

                </>
            )
        },
        {
            title: '8. Updates & Changes to This Policy',
            content: (
                <>
                    <BulletPointsWithHeading
                        points={
                            [
                                "LXS Store reserves the right to modify these guidelines at any time. Users will be notified of significant updates.",
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
                        For questions regarding community guidelines & user-generated content, contact us:
                    </p>

                    <ul className="list-disc list-inside space-y-1 leading-5 pl-14 -indent-[22px]">
                        <li><i className="fi fi-rr-envelope relative top-[2px]"></i> Email: [Insert support email]"</li>
                        <li><i className="fi fi-rr-phone-call relative top-[2px]"></i> Phone: [Insert contact number]"</li>
                        <li><i className="fi fi-rs-comment relative top-[2px]"></i> Live Chat: Available from [X:XX AM – X:XX PM]"</li>
                    </ul>

                    <p className="mt-5">
                        This Community Guidelines & UGC Policy ensures a safe, creative, and honest environment for all LXS Store
                        users. Let's build a great community together!
                    </p>
                </>
            )
        },
    ];

    return (
        <div className="w-full mx-auto px-20 py-5">
            <HeadingText name="Community Guidelines & User Generated Content Policy" className="text-[40px]" />
            <p className="text-lg font-medium mb-4">Updated: 22.06.2025</p>
            <p className="mb-4 text-lg leading-6 w-3/4">
                At LXS Store, we value our customers and want to reward them for their loyalty! Our LXS Rewards & Loyalty
                Program allows customers to earn points on purchases, referrals, and special activities, which can be
                redeemed for discounts, free products, and exclusive perks.
            </p>
            <p className="mb-4 text-lg leading-6 w-3/4">
                By using LXS Store’s website, forums, reviews, and social platforms, you agree to follow these community
                guidelines. Violations may result in content removal, account suspension, or permanent bans.
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

export default CommunityGuidelinesAndUserGeneratedContentPolicy
