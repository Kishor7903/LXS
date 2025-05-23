import BulletPointsWithHeading from "@/components/BulletPointsWithHeading";
import HeadingText from "@/components/HeadingText";
import { useState } from "react";


function PrivacyPolicy() {
    const [openIndex, setOpenIndex] = useState(-1);

    const toggleSection = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    const sections = [
        {
            title: '1. Introduction:',
            content: (
                <>
                    <p className="mb-2">
                        This Privacy Policy applies to all users of LXS Store, including but not limited to:
                    </p>

                    <BulletPointsWithHeading
                        points={
                            [
                                "Shoppers who browse, purchase, and review products.",
                                "Sellers who list and sell products on our platform.",
                                "Job Seekers who explore and apply for job opportunities.",
                                "Job Posters who list vacancies and hire candidates.",
                                "Influencers who collaborate with brands for promotions.",
                                "Companies seeking partnerships or job applicants.",
                                "Artists who showcase, sell, and license their artwork.",
                                "Users of the Art Marketplace who engage with creative content.",
                            ]
                        }
                    />

                    <p className="mt-5">
                        We collect personal information to enhance your user experience, provide seamless services, ensure
                        security, and maintain compliance with legal and business requirements. By using LXS Store, you
                        acknowledge and consent to our data collection, usage, and sharing practices as outlined in this policy.
                    </p>
                </>
            )
        },
        {
            title: '2. Information We Collect:',
            content: (
                <>
                    <p className="mb-2">
                        We collect various types of information based on your interaction with our platform. This information helps us improve our services, provide personalized recommendations, and ensure smooth transactions.
                    </p>

                    <BulletPointsWithHeading
                        heading="Information You Provide Directly:"
                        points={
                            [
                                "Account Registration: Full name, email address, phone number, username, password. ",
                                "Shopping & Orders: Billing address, shipping address, payment details (Note: we do not store credit or debit card details, but we process transactions via secure third-party payment providers). ",
                                "Seller & Artist Registration: Business details, portfolio links, bank account details (for payouts), and tax-related information (where applicable). ",
                                "Job Listings & Applications: Resume, cover letter, job descriptions, company name, industry details, and hiring preferences. ",
                                "Influencer Marketplace: Social media profile links, content preferences, past brand collaborations, and engagement analytics.",
                                "Customer Support Requests: Communication records between users and our support team for issue resolution and assistance. ",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Information We Collect Automatically:"
                        points={
                            [
                                "Device Information: IP address, browser type, operating system, device model, and unique device identifiers. ",
                                "Usage Data: Browsing behaviour, pages visited, time spent on the website, referral sources, and interactions with various platform features.  ",
                                "Cookies & Tracking Technologies: We use cookies, web beacons, and tracking tools to enhance user experience, analyze website traffic, and provide relevant content.  ",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Information from Third Parties:"
                        points={
                            [
                                "Payment Processors: Transaction details, payment confirmations, and security verifications (credit/debit card information is handled by payment gateways and not stored by us). ",
                                "Marketing Partners: Data used to improve targeted advertisements and product recommendations. ",
                                "Social Media Platforms: If you log in via Google, Facebook, or other social media accounts, we collect your public profile information, email address, and preferences to streamline account creation and login processes."
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '3. How We Use Your Information:',
            content: (
                <>
                    <p className="mb-2">
                        Your personal information is used for a variety of purposes to ensure a seamless experience on LXS Store.
                    </p>

                    <BulletPointsWithHeading
                        heading="General Website Use: "
                        points={
                            [
                                "To create, maintain, and manage your user account. ",
                                "To personalize content and recommend products based on your preferences. ",
                                "To conduct website performance analysis and improve usability. "
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Shopping & Orders:"
                        points={
                            [
                                "To process purchases, manage payments, and ensure secure transactions. ",
                                "To provide real-time order tracking and estimated delivery updates. ",
                                "To facilitate refunds, returns, and dispute resolution between buyers and sellers."
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Sellers & Artists:"
                        points={
                            [
                                "To verify seller and artist accounts and prevent fraudulent activities. ",
                                "To showcase artworks, products, and designs in our marketplace. ",
                                "To manage artist commissions, earnings distribution, and payouts. "
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Jobs & Influencer Marketplace: "
                        points={
                            [
                                "To help job seekers discover employment opportunities and submit applications. ",
                                "To enable businesses to post job listings and connect with candidates. ",
                                "To facilitate brand-influencer collaborations and ensure compliance with partnership agreements. "
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Customer Support & Security: "
                        points={
                            [
                                "To respond to inquiries, troubleshoot technical issues, and resolve disputes. ",
                                "To prevent fraud, unauthorized access, and security breaches. ",
                                "To comply with legal obligations, protect user rights, and enforce our Terms of Service. "
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '4. Information Sharing and Disclosure:',
            content: (
                <>
                    <p className="mb-2">
                        We do not sell your personal data. However, we may share your information with trusted entities under the following circumstances:
                    </p>

                    <BulletPointsWithHeading
                        heading="Service Providers: "
                        points={
                            [
                                "Payment Gateways: Secure transaction processing through third-party providers like PayPal and Razorpay. ",
                                "Shipping Partners: Sharing necessary details to ensure successful order fulfillment and delivery. ",
                                "Cloud Storage & Analytics: Secure data storage and performance monitoring. "
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Business Partners: "
                        points={
                            [
                                "Brand Collaborations: Connecting sellers, influencers, and brands for marketing purposes. ",
                                "Advertising & Marketing Agencies: To provide personalized promotions and improve ad targeting. ",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Legal & Compliance:"
                        points={
                            [
                                "Regulatory Compliance: To comply with legal requirements and respond to government requests. ",
                                "Fraud Prevention & Security: To protect user data, detect fraudulent activities, and enforce legal agreements."
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '5. Your Rights and Choices:',
            content: (
                <>
                    <p className="mb-2">
                        As a user of LXS Store, you have full control over your personal data:
                    </p>

                    <BulletPointsWithHeading
                        points={
                            [
                                "Access & Correction: Review and update your personal information via account settings.",
                                "Data Deletion: Request permanent account deletion by contacting our support team.",
                                "Marketing Preferences: Unsubscribe from promotional emails through the opt-out link provided.",
                                "Cookie Preferences: Modify tracking settings through browser preferences. ",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '6. Security Measure:',
            content: (
                <>
                    <p className="mb-2">
                        We implement stringent security measures to safeguard your data:
                    </p>

                    <BulletPointsWithHeading
                        points={
                            [
                                "Data Encryption: Sensitive information and transactions are encrypted for enhanced security. ",
                                "Secure Payments: Payments are processed via industry-standard encrypted gateways. ",
                                "Account Protection: Multi-factor authentication (MFA) is available for additional security. ",
                                "Fraud Monitoring: User activity is monitored to detect and prevent fraudulent transactions. "
                            ]
                        }
                    />
                    <p className="mt-5">
                        While we take necessary precautions, users are encouraged to use strong passwords and avoid sharing sensitive login credentials.
                    </p>
                </>
            )
        },
        {
            title: "7. Children's Policy:",
            content: (
                <>
                    <p className="mb-2">
                        LXS Store is not intended for children under the age of 18. We do not knowingly collect personal data from minors. If a child’s data is found in our system, we will delete it immediately.
                    </p>
                </>
            )
        },
        {
            title: '8. Change To The Privacy Policy:',
            content: (
                <>
                    <p className="mb-2">
                        We may update this Privacy Policy periodically. Any revisions will be posted on this page with the "Last Updated" date. If changes are significant, we will notify users through email or website notifications.
                    </p>
                </>
            )
        },
    ];

    return (
        <div className="w-full mx-auto px-20 py-5">
            <HeadingText name="Privacy Policy" className="text-[40px]" />
            <p className="text-lg font-medium mb-2">Updated: 22.06.2025</p>
            <p className="mb-4 text-lg leading-6 w-3/4">
                Welcome to LXS Store! We highly value your trust and are committed to protecting your privacy. <br /> This Privacy
                Policy explains in detail how we collect, use, share, and safeguard your personal information when you access or
                use our website and services. By continuing to use LXS Store, you agree to the practices described in this
                Privacy Policy.
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

export default PrivacyPolicy
