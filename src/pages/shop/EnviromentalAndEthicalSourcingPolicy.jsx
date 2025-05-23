import BulletPointsWithHeading from "@/components/BulletPointsWithHeading";
import HeadingText from "@/components/HeadingText";
import { useState } from "react";

function EnviromentalAndEthicalSourcingPolicy() {
    const [openIndex, setOpenIndex] = useState(-1);

    const toggleSection = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    const sections = [
        {
            title: '1. Environmental Responsibility',
            content: (
                <>
                    <p className="mb-2">
                        We take active steps to minimize our environmental footprint by focusing on sustainable materials, waste
                        reduction, and eco-friendly processes.
                    </p>

                    <BulletPointsWithHeading
                        heading="Sustainable Materials & Production:"
                        points={
                            [
                                "We prioritize the use of organic, recycled, and biodegradable materials in our products.",
                                "Our suppliers must adopt eco-friendly manufacturing processes that reduce water, energy, and resource consumption.",
                                "We aim to use low-impact dyes and non-toxic printing methods for clothing and merchandise.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Waste Reduction & Recycling:"
                        points={
                            [
                                "We minimize waste by implementing efficient production processes.",
                                "Our packaging materials are recyclable, biodegradable, or reusable.",
                                "We promote a zero-waste approach by reducing excess inventory and repurposing unsold stock.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Carbon Footprint Reduction:"
                        points={
                            [
                                "We are committed to reducing greenhouse gas emissions by optimizing energy-efficient manufacturing and logistics.",
                                "We encourage our suppliers to use renewable energy sources where possible.",
                                "We explore carbon offset initiatives to compensate for unavoidable emissions.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '2. Ethical Sourcing & Fair Labor Practices',
            content: (
                <>
                    <p className="mb-2">
                        We ensure that all materials and products sold on LXS Store are sourced ethically and responsibly, following
                        international labour laws and human rights standards.
                    </p>

                    <BulletPointsWithHeading
                        heading="Supplier Code of Conduct:"
                        subHeading="All suppliers and manufacturers working with LXS Store must:"
                        points={
                            [
                                "Follow fair wages and working hours in compliance with labour laws.",
                                "Prohibit child labour and forced labour in any form.",
                                "Provide safe and hygienic working conditions.",
                                "Ensure equal employment opportunities without discrimination.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Fair Trade & Social Impact:"
                        points={
                            [
                                "We support Fair Trade-certified suppliers and products where possible.",
                                "We encourage partnerships with small-scale artisans and ethical manufacturers.",
                                "We ensure that workers in our supply chain receive fair compensation and dignified work environments.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="No Exploitation Policy:"
                        points={
                            [
                                "We do not support unethical labour practices, unsafe working conditions, or worker exploitation.",
                                "We strictly prohibit sourcing from companies that violate human rights.",
                                "Suppliers must undergo regular audits to ensure compliance with ethical sourcing policies.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '3. Responsible Packaging & Shipping',
            content: (
                <>
                    <p className="mb-2">
                        We strive to make our shipping and packaging processes eco-friendly.
                    </p>

                    <BulletPointsWithHeading
                        heading="Sustainable Packaging:"
                        points={
                            [
                                "We use minimal and recyclable packaging to reduce plastic waste.",
                                "We aim to transition to biodegradable and compostable packaging materials.",
                                "Customers are encouraged to recycle or reuse packaging to minimize waste.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Green Logistics:"
                        points={
                            [
                                "We work with eco-conscious shipping partners to reduce transportation emissions.",
                                "We prioritize carbon-neutral delivery options where available.",
                                "Customers can opt for sustainable shipping choices at checkout.",
                            ]
                        }
                    />

                </>
            )
        },
        {
            title: '4. Ethical Sourcing for Art Marketplace & Sellers',
            content: (
                <>
                    <p className="mb-2">
                        LXS Store also ensures that artists, designers, and third-party sellers follow ethical and sustainable practices
                        when listing their products.
                    </p>

                    <BulletPointsWithHeading
                        heading="Artist & Seller Responsibilities:"
                        points={
                            [
                                "Artists must ensure that their products are original and ethically produced.",
                                'Sellers using sustainable materials will receive "Eco-Friendly" badges on their listings.',
                                "We encourage sellers to minimize environmental impact in their production processes.",
                            ]
                        }
                    />

                    <BulletPointsWithHeading
                        heading="Marketplace Review Process:"
                        points={
                            [
                                "LXS Store reviews supplier and artist applications to ensure ethical compliance.",
                                "Products that violate environmental or ethical standards may be removed from the platform.",
                            ]
                        }
                    />

                </>
            )
        },
        {
            title: '5. Continuous Improvement & Future Goals',
            content: (
                <>
                    <p className="mb-2">
                        We are continuously working to improve our sustainability and ethical sourcing efforts. Our future goals
                        include:
                    </p>

                    <BulletPointsWithHeading
                        points={
                            [
                                "Achieving 100% sustainable packaging by [Insert Year].",
                                "Partnering with ethical organizations and sustainability initiatives.",
                                "Encouraging customer participation in recycling programs.",
                                "Expanding the availability of eco-friendly products on our platform.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '6. Compliance & Accountability',
            content: (
                <>
                    <BulletPointsWithHeading
                        points={
                            [
                                "We require all suppliers, sellers, and partners to adhere to our environmental and ethical sourcing policies.",
                                "Suppliers must provide documentation proving ethical sourcing and sustainable practices.",
                                "Regular audits and inspections will be conducted to ensure compliance.",
                            ]
                        }
                    />
                </>
            )
        },
        {
            title: '7. Contact & Reporting Violations',
            content: (
                <>
                    <p className="mb-2">
                        If you have any questions or concerns about our Environmental & Ethical Sourcing Policy or wish to report
                        unethical practices, please contact us:
                    </p>

                    <ul className="list-disc list-inside space-y-1 leading-5 pl-14 -indent-[22px]">
                        <li><i className="fi fi-rr-envelope relative top-[2px]"></i> Email: [Insert support email]"</li>
                        <li><i className="fi fi-rr-phone-call relative top-[2px]"></i> Phone: [Insert contact number]"</li>
                        <li><i className="fi fi-rs-comment relative top-[2px]"></i> Live Chat: Available from [X:XX AM – X:XX PM]"</li>
                    </ul>

                    <p className="mt-5">
                        This Environmental & Ethical Sourcing Policy reflects LXS Store’s commitment to a greener, more responsible
                        future while maintaining high ethical standards.
                    </p>
                </>
            )
        },
    ];

    return (
        <div className="w-full mx-auto px-20 py-5">
            <HeadingText name="Environmental & Ethical Sourcing Policy" className="text-[40px]" />
            <p className="text-lg font-medium mb-4">Updated: 22.06.2025</p>
            <p className="mb-4 text-lg leading-6 w-3/4">
                At LXS Store, we are committed to sustainable business practices, environmental responsibility, and ethical
                sourcing. We recognize the importance of reducing our environmental impact and ensuring that our
                products are sourced and produced ethically. This policy outlines our commitment to sustainability, fair
                labour, and responsible sourcing throughout our supply chain.
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

export default EnviromentalAndEthicalSourcingPolicy
