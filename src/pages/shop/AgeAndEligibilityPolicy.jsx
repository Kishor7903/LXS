import BulletPointsWithHeading from "@/components/BulletPointsWithHeading";
import HeadingText from "@/components/HeadingText";
import { useState } from "react";


function AgeAndEligibilityPolicy() {
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
                                "Shoppers who browse and purchase products.",
                                "Sellers who list and sell items.",
                                "Job Seekers and Job Posters using our Job Portal.",
                                "Influencers, Artists, and Creators participating in collaborations or marketplaces.",
                                "Any visitor engaging with LXS Store’s services.",
                            ]
                        }
                    />
                    <p className="mb-2">
                    We set clear age and eligibility rules to ensure safety, compliance with laws, and responsible usage of our platform.
                    </p>
                </>
            )
        },
        {
            title: '2. Age Requirements',
            content: (
                <>
                    <BulletPointsWithHeading
                        points={
                            [
                                "Minimum Age: You must be at least 13 years old to use LXS Store for browsing and shopping.",
                                "Restricted Services: Some services (such as selling products, listing jobs, influencer collaborations, or financial transactions) require you to be 18 years or older.",
                                "Parental Consent: If you are between 13 and 17 years old, you may use LXS Store only under the supervision of a parent or legal guardian, who must agree to our Terms and Privacy Policy on your behalf.",
                                "Children Under 13: LXS Store does not knowingly allow children under 13 to create accounts or submit personal data. If such data is found, it will be deleted immediately.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '3. Eligibility to Use Our Services',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="To use LXS Store’s services, you must:"
                        points={
                            [
                                "Have the legal capacity to enter into binding contracts under Indian law (or the laws of your country of residence).",
                                "Provide accurate, up-to-date information during registration and maintain your account details.",
                                "Use the platform only for lawful purposes and not engage in fraudulent, harmful, or prohibited activities.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '4. Special Conditions for Sellers, Artists, and Employers',
            content: (
                <>
                    <BulletPointsWithHeading
                        points={
                            [
                                "Sellers & Artists: Must be at least 18 years old to register, list, and sell products or artwork.",
                                "Employers / Job Posters: Must be legally registered entities or individuals above 18 years of age.",
                                "Influencer & Brand Collaborations: Require users to be 18+ and capable of entering into business agreements."
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '5. Consequences of Misrepresentation',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="If you misrepresent your age or eligibility:"
                        points={
                            [
                                "Your account may be suspended or terminated without prior notice.",
                                "Transactions may be cancelled, and payments withheld.",
                                "You may be held legally responsible for any damages, fraud, or misuse caused.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '6. Changes to This Policy',
            content: (
                <>
                    <p className="mb-2">
                    We may update this Age & Eligibility Policy from time to time. Updates will be reflected with a revised “Last Updated” date.
                    </p>
                </>
            )
        },
        {
            title: '7. Contact Us',
            content: (
                <>
                    <p className="mb-2">
                        For questions about this policy or cookie usage, please reach out to us: <br /> <br />
                        📧 Email: support@lxslifestylestore.com <br />
                        📞 Phone: +91 8987888368 <br /> <br />
                        Thank you for being part of the LXS Store community! 🚀
                    </p>
                </>
            )
        }
    ];
    
    return (
        <div className="w-full mx-auto px-20 py-5">
            <HeadingText name="Age & Eligibility Policy for LXS Store" className="text-[40px]" />
            <p className="text-lg font-medium mb-4">Updated: 22.06.2025</p>
            <p className="mb-4 text-lg leading-6 w-full">
            Welcome to LXS Store! To maintain a safe and responsible online marketplace, this Age & Eligibility Policy explains who can access and use our platform. By using LXS Store, you confirm that you meet the age and eligibility requirements outlined below.
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

export default AgeAndEligibilityPolicy
