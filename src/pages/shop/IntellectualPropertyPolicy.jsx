import BulletPointsWithHeading from '@/components/BulletPointsWithHeading';
import HeadingText from '@/components/HeadingText';
import React, { useState } from 'react'

function IntellectualPropertyPolicy() {
    const [openIndex, setOpenIndex] = useState(-1);

    const toggleSection = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    const sections = [
        {
            title: '1. Intellectual Property Rights at LXS Store',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Ownership of LXS Store Content:"
                        points={
                            [
                                "All content on the LXS Store website, including but not limited to text, graphics, logos, images, designs,videos, and software, is the exclusive property of LXS Store or its licensors. It is protected by copyright, trademark, and other applicable laws.",
                                "You may not Copy, modify, distribute, reproduce, or exploit any content without prior written permission from LXS Store.",
                                "Use LXS Store branding, trademarks, or assets for any commercial or non-commercial use without authorization."
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Trademarks & Brand Protection:"
                        points={
                            [
                                "LXS, LXS Store, LXS Production, and related logos are registered trademarks of Sachin Kumar (Founder & CEO).",
                                "Unauthorized use of these trademarks is strictly prohibited and may result in legal action.",
                            ]
                        }
                    />


                </>
            )
        },
        {
            title: '2. Intellectual Property for Sellers, Artists, and Influencers',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Seller & Brand Assets:"
                        points={
                            [
                                "Seller’s listing products on LXS Store must have the legal right to use brand names, trademarks, and copyrighted content.",
                                "Any unauthorized use of a third-party brand or logo may lead to account suspension or legal action."
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Art Marketplace & Digital Products:"
                        points={
                            [
                                "Artists selling digital or physical artwork on LXS Art Marketplace retain full copyright unless they transfer ownership.",
                                "Buyers receive only a license to use the purchased art, not the copyright, unless explicitly mentioned in the product description.",
                                "Unauthorized resale, reproduction, or modification of artwork is strictly prohibited."
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Influencer Content & Collaborations:"
                        points={
                            [
                                "Influencers listing their profiles on LXS Store must have rights to all images, videos, and promotionalcontent used.",
                                "Brands using influencer content must obtain written permission before republishing or modifying thematerial."
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '3. Copyright Infringement & DMCA Policy',
            content: (
                <>
                    <span className="font-medium">Reporting Copyright Infringement:</span>
                    <ul className="list-disc list-inside space-y-1 leading-5 pl-14 -indent-[22px]">
                        <li>If you believe that your copyrighted work has been used on LXS Store without authorization, you can
                            report it by sending a Copyright Infringement Notice (DMCA Notice) to: <br />
                            Email: [Insert support email] <br />
                            Phone: [Insert contact number]</li>
                    </ul>

                    <BulletPointsWithHeading
                        heading="Your notice must include:"
                        points={
                            [
                                "Your full name & contact details.",
                                "A detailed description of the copyrighted work that has been infringed.",
                                "The specific URL or location on LXS Store where the infringing content appears.",
                                "A statement that you own the copyright or are authorized to act on behalf of the copyright owner.",
                                "Your digital or physical signature."
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Upon receiving a valid notice, LXS Store will:"
                        points={
                            [
                                "Investigate the claim and remove the infringing content if necessary",
                                "Notify the alleged infringer, giving them a chance to respond.",
                                "Take action as per Indian copyright laws & the Digital Millennium Copyright Act (DMCA).",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Counter-Notification Process:"
                        points={
                            [
                                "If your content was wrongly removed, you may submit a counter-notification with proof of ownership.",
                                "If valid, LXS Store may reinstate the content after reviewing the dispute.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '4. User Responsibilities & Prohibited Activities',
            content: (
                <>
                    <p className="mb-2">
                        Users and sellers on LXS Store must not:
                    </p>
                    <BulletPointsWithHeading
                        points={
                            [
                                "Upload, sell, or distribute copyrighted content without permission.",
                                "Use AI-generated content that mimics copyrighted works without consent.",
                                "List counterfeit or unauthorized products in the marketplace.",
                                "Copy or scrape LXS Store’s content, product listings, or brand assets.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '5. Consequences of Intellectual Property Violations',
            content: (
                <>
                    <p className="mb-2">
                        Violating this policy may result in:
                    </p>
                    <BulletPointsWithHeading
                        points={
                            [
                                "Content removal from LXS Store.",
                                "Temporary or permanent account suspension.",
                                "Legal action, including financial penalties for repeat violations."
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '6. Contact & Support',
            content: (
                <>
                    <ul className="list-disc list-inside space-y-1 leading-5 pl-14 -indent-[22px]">
                        <li>For IP-related issues, contact LXS Store Legal Team: <br />
                            Email: [Insert legal email] <br />
                            Phone: [Insert legal contact number]</li>
                    </ul>
                    <p className="mt-5">
                        This Intellectual Property Policy ensures a fair and legally compliant marketplace. If you have concerns
                        about IP violations or need legal clarity, feel free to reach out!
                    </p>
                </>
            )
        },
    ];
    return (
        <div className="w-full mx-auto px-20 py-5">
            <HeadingText name="Intellectual Property Policy" className="text-[40px]" />
            <p className="text-lg font-medium mb-2">Updated: 22.06.2025</p>
            <p className="mb-4 text-lg leading-6 w-3/4">
                At LXS Store, we respect and protect intellectual property (IP) rights, including copyrights, trademarks,
                patents, and digital content. This policy explains how we handle IP-related concerns, including ownership,
                infringement claims, and user responsibilities.
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

export default IntellectualPropertyPolicy
