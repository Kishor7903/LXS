import BulletPointsWithHeading from "@/components/BulletPointsWithHeading";
import HeadingText from "@/components/HeadingText";
import { useState } from "react";


function CookieAndTrackingPolicy() {
    const [openIndex, setOpenIndex] = useState(-1);

    const toggleSection = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    const sections = [
        {
            title: '1. What Are Cookies?',
            content: (
                <>
                    <p className="mb-2">
                    Cookies are small text files stored on your device (computer, tablet, or smartphone) when you visit a website. They help websites remember your preferences, login sessions, and browsing activities. Cookies also allow us to improve functionality, security, and personalization of our services.
                    </p>
                    <p className="mb-2">
                    In addition to cookies, we may use **web beacons, pixels, and tracking scripts** to analyze usage patterns and deliver relevant content.
                    </p>
                </>
            )
        },
        {
            title: '2. Types of Cookies We Use',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="We use different categories of cookies on LXS Store:"
                        points={
                            [
                                "Essential Cookies: Required for the website to function properly (e.g., login authentication, shopping cart, checkout).",
                                "Performance & Analytics Cookies: Help us understand how users interact with our platform, track website traffic, and improve usability (e.g., Google Analytics).",
                                "Functional Cookies: Store your preferences (e.g., language, currency, region) and improve your personalized experience.",
                                "Advertising & Marketing Cookies: Used to show you relevant ads, offers, and promotions on LXS Store or third-party websites (e.g., remarketing campaigns).",
                                "Security Cookies: Help detect fraudulent activity, protect user accounts, and ensure safe transactions."
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '3. Why We Use Cookies',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="We use cookies and tracking technologies for the following purposes:"
                        points={
                            [
                                "To keep you logged in and secure your account.",
                                "To remember your cart items and preferences across sessions.",
                                "To measure and analyze website performance.",
                                "To provide personalized product recommendations and promotions.",
                                "To deliver targeted advertising based on your browsing behavior.",
                                "To improve fraud prevention, security, and compliance."
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '4. Third-Party Cookies',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="We may allow trusted third-party service providers to place cookies on your device for:"
                        points={
                            [
                                "Payment processing (e.g., Razorpay).",
                                "Shipping & logistics updates.",
                                "Analytics and performance tracking (e.g., Google Analytics, Meta Pixel).",
                                "Advertising and remarketing campaigns."
                            ]
                        }
                    />
                    <p className="mb-2">
                        These third parties may collect data about your browsing activity across different websites.
                    </p>
                </>
            )
        },
        {
            title: '5. Your Choices & Control',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="You have full control over cookie settings:"
                        points={
                            [
                                "Browser Settings: You can block, disable, or delete cookies from your browser at any time.",
                                "Opt-Out Tools: Use “Do Not Track” (DNT) or ad-block tools to limit personalized tracking.",
                                "Cookie Consent Banner: Upon first visit, you may choose which cookies to accept or decline.",
                            ]
                        }
                    />
                    <p className="mb-2">
                    Please note: Disabling essential cookies may impact your ability to log in, shop, or use key features of LXS Store.
                    </p>
                </>
            )
        },
        {
            title: '6. Data Retention',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Cookies are stored for varying durations:"
                        points={
                            [
                                "Session Cookies: Deleted automatically when you close your browser.",
                                "Persistent Cookies: Remain until they expire or you manually delete them."
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
                    We may update this Cookies & Tracking Policy from time to time. Changes will be posted with a revised “Last Updated” date.
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
                        Thank you for choosing LXS Store! 🚀
                    </p>
                </>
            )
        }
    ];

    return (
        <div className="w-full mx-auto px-20 py-5">
            <HeadingText name="Cookies & Tracking Policy for LXS Store" className="text-[40px]" />
            <p className="text-lg font-medium mb-4">Updated: 22.06.2025</p>
            <p className="mb-4 text-lg leading-6 w-full">
            At LXS Store, we use cookies and similar tracking technologies to enhance your browsing experience, improve website performance, and provide personalized services. This Cookies & Tracking Policy explains what cookies are, how we use them, and how you can manage your preferences. By continuing to use LXS Store, you agree to our use of cookies and tracking technologies as described in this policy.
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

export default CookieAndTrackingPolicy
