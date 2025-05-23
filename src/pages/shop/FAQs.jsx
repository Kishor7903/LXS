import BulletPointsWithHeading from "@/components/BulletPointsWithHeading";
import HeadingText from "@/components/HeadingText";
import { useState } from "react";

function FAQs() {
    const [openIndex, setOpenIndex] = useState(-1);

    const toggleSection = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    const sections = [
        {
            title: '1. General Questions',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Q1: What is LXS Store?"
                        subHeading="LXS Store is a multi-functional online platform that provides a range of services, including:"
                        points={
                            [
                                "E-commerce shopping – Buy high-quality products from verified sellers.",
                                "Job listings & hiring – Find or post jobs in various industries.",
                                "Influencer marketplace – Connect influencers with brands for collaborations.",
                                "Art marketplace – Sell and buy digital and physical artwork.",
                                "LXS Store is designed to be a one-stop destination for businesses, creators, and consumers to interact and transact in a secure environment.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Q2: Who can use LXS Store?"
                        points={
                            [
                                "LXS Store is open to anyone who is 18 years or older.",
                                "Shoppers can browse and purchase products.",
                                "Sellers can list and sell items.",
                                "Artists can showcase and sell their artwork.",
                                "Employers can post job opportunities.",
                                "Influencers can collaborate with brands.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Q3: Is LXS Store available worldwide?"
                        subHeading="Yes! LXS Store is a global platform, meaning users from any country can access our services. However, certain features like job postings, influencer collaborations, and specific products may have regional restrictions based on local laws and policies."
                    />

                    <BulletPointsWithHeading
                        heading="Q4: How do I create an account?"
                        points={
                            [
                                "Creating an account on LXS Store is simple and free!",
                                "Go to the homepage and click on Sign Up.",
                                "Enter your details, including name, email, and password.",
                                "Verify your email through the confirmation link sent to your inbox.",
                                "Log in and start exploring the platform!",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '2. Shopping & Orders',
            content: (
                <>

                    <BulletPointsWithHeading
                        heading="Q5: How do I place an order?"
                        points={
                            [
                                "Browse the products available on the platform.",
                                "Select the items you want and add them to your cart.",
                                "Click on Proceed to Checkout and enter your shipping details.",
                                "Choose a payment method and confirm your purchase.",
                                "Once the order is placed, you will receive a confirmation email with tracking details.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Q6: What payment methods are accepted?"
                        subHeading="LXS Store supports multiple secure payment options, including:"
                        points={
                            [
                                "Credit & Debit Cards (Visa, Mastercard, American Express)",
                                "PayPal",
                                "Online Banking & UPI (for supported regions)",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Q7: Can I track my order?"
                        subHeading="Yes! To track your order:"
                        points={
                            [
                                "Log in to your account.",
                                "Click on My Orders in your profile.",
                                "Select the order you want to track and check the shipment status.",
                            ]
                        }
                    />
                    <BulletPointsWithHeading
                        heading="Q8: What is the return policy?"
                        points={
                            [
                                "Each seller has their own return policy, so it is important to read the Return & Refund terms before purchasing.",
                                "Products eligible for return will have a return window mentioned on the product page.",
                                "Some items (such as custom-made products and digital downloads) may be non-refundable.",
                            ]
                        }
                    />
                    <BulletPointsWithHeading
                        heading="Q9: How do I cancel an order?"
                        points={
                            [
                                "If your order has not been shipped, you can cancel it directly from My Orders.",
                                "If your order has already been dispatched, cancellation may not be possible, but you can request a return after receiving the item.",
                            ]
                        }
                    />
                    <BulletPointsWithHeading
                        heading="Q10: Do you offer bulk orders?"
                        points={
                            [
                                "Yes! Use the Bulk Order section to request special pricing.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '3. Selling on LXS Store',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Q11: How can I become a seller?"
                        points={
                            [
                                "Sign up as a Seller through the Sell on LXS option.",
                                "Provide necessary business details for verification.",
                                "List your products with images, descriptions, and pricing.",
                                "Once your store is set up, you can start receiving orders and selling worldwide!",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Q12: Are there any selling fees?"
                        subHeading="Yes, LXS Store charges a small commission on every sale. The exact percentage depends on:"
                        points={
                            [
                                "The product category.",
                                "The type of seller account (individual vs. business).",
                                "Whether the product is custom-made or digital art.",
                            ]
                        }
                    />
                    <BulletPointsWithHeading
                        heading="Q13: How do I receive payments?"
                        subHeading="Sellers receive payments through secure payout methods, including:"
                        points={
                            [
                                "Direct bank transfers",
                                "PayPal",
                                "Other local payment options (if applicable)",
                                "Payments are processed once the order is completed and delivered.",
                            ]
                        }
                    />
                    <BulletPointsWithHeading
                        heading="Q14: Can I list custom-made products?"
                        subHeading='Yes! Sellers can offer custom orders under the "Personalized" section.'
                    />

                </>
            )
        },
        {
            title: '4. Job Listings & Hiring',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Q15: How do I post a job?"
                        points={
                            [
                                'Go to the "Post a Job" section in your Employer Dashboard.',
                                'Enter job details, including title, description, and salary range.',
                                "Set application deadlines and post the job.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Q16: Is there a fee for posting jobs?"
                        points={
                            [
                                "Basic job listings are free.",
                                "Featured job listings (which gain more visibility) may require a small fee.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Q17: How do I apply for a job?"
                        points={
                            [
                                'Go to the "Find Jobs" section.',
                                "Browse available job listings.",
                                "Click on a job post, read the description, and submit your application.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Q18: Can I edit or remove my job posting?"
                        subHeading="Yes, you can manage job listings in your Employer Dashboard."
                    />

                    <BulletPointsWithHeading
                        heading="Q19: How do companies contact applicants?"
                        subHeading="Employers can directly message applicants through our platform."
                    />

                </>
            )
        },
        {
            title: '5. Influencer Marketplace',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Q20: How do I become an influencer on LXS Store?"
                        points={
                            [
                                "Apply for the Influencer Program by providing your social media details and follower statistics.",
                                "Once approved, brands can discover your profile and send collaboration requests.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Q21: How do companies find influencers?"
                        subHeading="Brands can search influencers by category and send collaboration requests."
                    />

                    <BulletPointsWithHeading
                        heading="Q22: Can influencers set their own rates?"
                        subHeading="Yes, influencers set their own pricing for promotions."
                    />

                    <BulletPointsWithHeading
                        heading="Q23: What happens if a company doesn’t pay?"
                        subHeading="All payments must go through LXS Store to ensure safety. If a company bypasses the platform, they may be banned."
                    />

                    <BulletPointsWithHeading
                        heading="Q24: How do influencers get paid?"
                        points={
                            [
                                "Influencers set their own pricing for brand promotions.",
                                "Payments are processed securely through LXS Store after completing the campaign.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '6. Art Marketplace',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="25: How do I sell my artwork?"
                        subHeading="Sign up as an Artist."
                        points={
                            [
                                "Upload your artwork, set pricing, and add descriptions.",
                                "Once approved, your artwork will be listed for sale.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Q26: Can I sell both physical and digital art?"
                        subHeading="Yes! You can sell:"
                        points={
                            [
                                "Physical artwork (prints, paintings, sculptures).",
                                "Digital downloads (illustrations, 3D models, NFTs).",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Q27: How do buyers receive digital art?"
                        subHeading="Once purchased, buyers can download the artwork from their account."
                    />

                    <BulletPointsWithHeading
                        heading="Q28: Are there commission fees for artists?"
                        subHeading="Yes, a small commission is deducted from each sale."
                    />

                    <BulletPointsWithHeading
                        heading="Q29: Can I protect my art from unauthorized use?"
                        subHeading="Yes, you can add watermarks or limit downloads. Buyers must agree to a license before purchasing."
                    />
                </>
            )
        },
        {
            title: '7. Security & Account Issues',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Q30: Is my payment information secure?"
                        subHeading="Absolutely! LXS Store follows strict data encryption standards to ensure user security and privacy."
                    />

                    <BulletPointsWithHeading
                        heading="Q31: What should I do if I forget my password?"
                        subHeading="Click Forgot Password? on the login page and follow the instructions to reset it."
                    />

                    <BulletPointsWithHeading
                        heading="Q32: Can I delete my account?"
                        subHeading="If you wish to delete your account, go to My Account Settings and request account deletion."
                    />

                    <BulletPointsWithHeading
                        heading="Q33: What if I notice suspicious activity on my account?"
                        points={
                            [
                                "Change your password immediately.",
                                "Contact LXS Store Support for assistance.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '8. Policies & Support',
            content: (
                <>
                    <span className="font-bold">Q34: Where can I read your Privacy Policy and Terms?</span> <br />
                    <span className="relative bottom-1 left-8">You can find them here:</span>
                    <ul className="list-disc list-inside space-y-1 leading-5 pl-14 -indent-[22px] mb-5">
                        <li><i className="fi fi-tr-document relative top-[2px]"></i> Privacy Policy</li>
                        <li><i className="fi fi-tr-document relative top-[2px]"></i> Terms & Conditions</li>
                    </ul>

                    <span className="font-bold">Q35: How do I contact customer support?</span>
                    <ul className="list-disc list-inside space-y-1 leading-5 pl-14 -indent-[22px] mb-5">
                        <li><i className="fi fi-rr-envelope relative top-[2px]"></i> Email: [Insert support email]"</li>
                        <li><i className="fi fi-rr-phone-call relative top-[2px]"></i> Phone: [Insert contact number]"</li>
                    </ul>

                    <BulletPointsWithHeading
                        heading="Q36: Does LXS Store have a refund policy?"
                        subHeading="Refund policies vary by seller. Please check individual product pages for refund eligibility"
                    />
                </>
            )
        },
        {
            title: '9. Future Features & Updates',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Q37: Will LXS Store introduce AR/VR shopping?"
                        subHeading="Yes! We are currently developing AR & VR integration, allowing users to:"
                        points={
                            [
                                "Try on clothes virtually before purchasing.",
                                "View 3D models of products.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Q38: Can businesses advertise on LXS Store?"
                        subHeading="Yes! Businesses can promote their products and services through sponsored listings and banner ads on our platform."
                    />
                </>
            )
        },
        {
            title: '10. Community & Membership',
            content: (
                <>
                    <BulletPointsWithHeading
                        heading="Q39: Does LXS Store have a loyalty program?"
                        subHeading="Yes!"
                    />
                </>
            )
        },
    ];

    return (
        <div className="w-full mx-auto px-20 py-5">
            <HeadingText name="FAQs (Frequently Asked Questions)" className="text-[40px]" />
            <p className="mb-4 text-lg leading-6 w-3/4">
                Welcome to the LXS Store FAQ section! Here, we’ve answered the most common questions about shopping,
                selling, jobs, influencers, and the art marketplace.
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

export default FAQs
