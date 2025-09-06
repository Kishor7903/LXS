import bgImage from "../../assets/Banners/Banner10.png"

let content = [
    {
        title: "1. Shopping Made Seamless 🚀",
        description: "Explore a universe of trendy fashion, tech gadgets, lifestyle products, and exclusive designs inspired by the multiverse. With high-quality products, secure transactions, and a user-friendly shopping experience, we ensure that every purchase is a step into the future. Whether you're looking for everyday essentials or exclusive space-themed collections, we've got you covered!",
        subTitle: "Why Stop with Us?",
        points: ["Exclusive & Trendy Design", "Secure Payments & Fast Checkout", "Global Shipping & Reliable Delivery", "Easy Return & Customer Support"]
    },
    {
        title: "2. Start Selling & Grow Your Business 🌎",
        description: "Whether you're a brand, an entrepreneur, or a small business owner, LXS Store gives you the perfect platform to showcase and sell your products. Our marketplace allows sellers to list their products, manage inventory, and reach a global audience effortlessly.",
        subTitle: "Why Sell on LXS Store?",
        points: ["No Hassle - We Handle The Tech", "Seller Dashboard for Easy Management", "Marketing & Promotion Tools", "Fast Payout & Secure Transactions"]
    },
    {
        title: "3. Find Post Job Ready Effortlessly 💼",
        description: "Looking for your dream job or the perfect candidate for your business? The LXS Job Hub connects job seekers with employers in various industries. Whether it's freelance gigs, remote work, or full-time jobs, we provide a dynamic and transparent job marketplace.",
        subTitle: "Why Use Our Job Portal?",
        points: ["Post Jobs & Find Top Talent", "Easy Application & Resume Management", "Freelance Full Time & Gig Opportunity", "Safe and Professional Hiring Process"]
    },
    {
        title: "4. Art Marketplace - Buy, Sell and Showcase your creativity 🎨",
        description: "LXS Store isn't just about shopping; it's a hub for creative minds! Our Art Marketplace allows artists to sell their digital and physical artworks, including paintings, 3D models, prints, and NFTs. Whether you're an artist looking to showcase your talent or a buyer looking for unique, high-quality art, this is the place for you.",
        subTitle: "Why Join Art Marketplace?",
        points: ["Sell & Monitize Your Art Globally", "Earn Royalties on Digital Art & NFT's", "Showcase & Promote your Portfolio", "Secure Licensing & Usage Right"]
    },
    {
        title: "5. Influencer Collaboration Hub - Connect & Monitize 🌟",
        description: "LXS Store empowers influencers by connecting them with brands and businesses for exciting collaborations. If you're a content creator, our Influencer Marketplace allows you to get sponsorships, work with top brands, and grow your reach.",
        subTitle: "Why Join as an Influencer?",
        points: ["Get Brand Deals and Sponsorship", "Accessing Marketing Tools & Analytics", "Earn Money & Grow Your Audience"]
    },
]

function AboutUs() {
    return (
        <div className="flex flex-col gap-10">
            <div className="border-y px-20" style={({ backgroundImage: `url(${bgImage})`, backgroundPosition: "center", backgroundSize: "cover" })}>
                <div className="h-[350px] w-full pt-10">
                    <h2 className="text-6xl font-extrabold tracking-wide text-center">Welcome To <span className="text-orange-400">LXS Store </span><br />Your Ultimate Digital Universe!</h2>
                    <p className="font-medium leading-5 px-7 mt-6 text-lg text-center opacity-80">At LXS Store, we are redefining the way you shop, sell, connect, and create. Our platform is more than just an online store—it’s a dynamic multiverse of opportunities where customers, sellers, artists, job seekers, employers, and influencers come together to build something extraordinary. Whether you're browsing the latest fashion trends, launching your own storefront, showcasing your creative work, or discovering your next career move, LXS is the place where possibilities multiply. We've designed our ecosystem to be intuitive, inclusive, and empowering—where every interaction adds value, every voice is heard, and every ambition has room to grow. With cutting-edge tools, a vibrant community, and seamless integration across commerce, content, and collaboration, LXS Store isn’t just keeping up with the digital age—it’s leading the way into a future where everyone thrives.</p>
                </div>
                <div className="h-[350px] w-full flex gap-20 items-center pb-10">
                    <div className="h-full w-1/4 border border-[rgb(8,43,61,0.6)] rounded-3xl bg-white"></div>
                    <div className="h-[70%] w-1/4 border border-[rgb(8,43,61,0.6)] rounded-3xl bg-white"></div>
                    <div className="h-full w-1/4 border border-[rgb(8,43,61,0.6)] rounded-3xl bg-white"></div>
                    <div className="h-[70%] w-1/4 border border-[rgb(8,43,61,0.6)] rounded-3xl bg-white"></div>
                </div>
            </div>
            <div className="flex gap-10 flex-col px-20">
                {
                    content.map((item, index) => (
                        <div className="" key={index}>
                            <h2 className="text-[35px]  font-bold">{item.title}</h2>
                            <p className="text-lg leading-6 font-medium mt-1 opacity-60">{item.description}</p>
                            <div className="flex gap-14 mt-10 px-5">
                                <div className="w-[40%] h-56 border border-[rgb(8,43,61,0.7)] rounded-3xl"></div>
                                <div className="text-lg font-semibold leading-10">
                                    <h5 className="mb-2 text-2xl">{item.subTitle}</h5>
                                    <div className="leading-4">
                                        {
                                            item.points.map((point, idx) => (
                                                <p key={idx}><i className="fi fi-sr-badge-check text-[rgb(34,197,94)] relative top-[8px] text-3xl"></i> <span className="opacity-60">{point}</span></p>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="flex flex-col gap-4 text-center border-t pt-5 px-20">
                <h3 className="text-[40px] font-extrabold">Why <span className="text-orange-500">LXS Store?</span></h3>
                <div className=" relative bottom-3">
                    <h6 className="text-2xl font-bold">🔹 A Multiverse of Possibilities</h6>
                    <p className="text-xl font-medium px-40">Whether you're shopping, selling, finding jobs, promoting art, or collaborating as an influencer, we bring everything under one roof.</p>
                </div>
                <div className=" relative bottom-3">
                    <h6 className="text-2xl font-bold">🔹 Seamless User Experience</h6>
                    <p className="text-xl font-medium px-40">Easy navigation, secure transactions, and 24/7 support ensure a hassle-free experience.</p>
                </div>
                <div className=" relative bottom-3">
                    <h6 className="text-2xl font-bold">🔹 Community-DrivenGrowth</h6>
                    <p className="text-xl font-medium px-40">We empower individuals, businesses, and creatives to thrive in a futuristic marketplace.</p>
                </div>
                <h3 className="text-[40px] font-extrabold">Where Style Meets Substance, and Every Detail Tells a Story.</h3>
                <p>At <span className="font-semibold">LXS Store</span>, we believe fashion is more than just clothing — it’s an experience, an expression, and a way of life. We’re proud to offer more than just stylish garments. We offer a curated, customer-first experience rooted in quality, sustainability, inclusivity, and innovation. Here's why LXS Store should be your ultimate destination for fashion that feels as good as it looks:</p>
                <div className="text-left">
                    <h6 className="text-lg font-semibold ">1. Premium Quality That Speaks for Itself</h6>
                    <p>We don’t compromise when it comes to quality. Every LXS garment is crafted with care, precision, and purpose — designed to look stunning and stand the test of time.</p>
                    <ul className="mt-2 ml-5">
                        <li><span className="font-semibold text-[rgb(253,84,120)]">World-Class Fabrics:</span> From organic cotton to rich silks and resilient wools, we source only the finest materials globally.</li>
                        <li><span className="font-semibold text-[rgb(253,84,120)]">Artisan Craftsmanship:</span> Each piece is stitched with passion and perfection by skilled artisans who bring our designs to life.</li>
                        <li><span className="font-semibold text-[rgb(253,84,120)]">Stringent Quality Control:</span> Every product goes through multi-stage testing to ensure comfort, durability, and elegance.</li>
                    </ul>
                </div>
                <div className="text-left">
                    <h6 className="text-lg font-semibold ">2. Fashion-Forward Designs That Stay Ahead</h6>
                    <p>Fashion moves fast — and so do we. Our collections are curated by visionary designers who live and breathe global trends, ensuring you're always dressed in what’s next.</p>
                    <ul className="mt-2 ml-5">
                        <li><span className="font-semibold text-[rgb(253,84,120)]">Trend-Driven Collections:</span>  We stay on the pulse of global runways, fashion weeks, and influencer insights to bring you the freshest looks.</li>
                        <li><span className="font-semibold text-[rgb(253,84,120)]">All-Occasion Styles:</span>  From workwear to weekend vibes, from brunch to gala night — we’ve got your style covered.</li>
                        <li><span className="font-semibold text-[rgb(253,84,120)]">Signature Details:</span> Unique prints, clever cuts, and stand-out embroidery give each piece that “where’d-you-get-that?” energy.</li>
                    </ul>
                </div>
                <div className="text-left">
                    <h6 className="text-lg font-semibold ">3. Inclusive Sizing for Every Body, Every Style</h6>
                    <p>We believe fashion should celebrate <span className="font-semibold">every</span> body. That’s why we offer inclusive sizing and tailored options to ensure the perfect fit — always.</p>
                    <ul className="mt-2 ml-5">
                        <li><span className="font-semibold text-[rgb(253,84,120)]">Extensive Size Range:</span>Whether petite or plus, you’ll find your fit with ease.</li>
                        <li><span className="font-semibold text-[rgb(253,84,120)]">Flattering Fits:</span> Our silhouettes are thoughtfully designed for all body types, shapes, and curves.</li>
                        <li><span className="font-semibold text-[rgb(253,84,120)]">Custom Alterations:</span>Need something tweaked? We offer made-to-measure options for a flawless fit.</li>
                    </ul>
                </div>
                <div className="text-left">
                    <h6 className="text-lg font-semibold ">4. Sustainable Practices That Make an Impact</h6>
                    <p>We’re deeply committed to creating fashion that’s kind to the planet and fair to the people who make it.</p>
                    <ul className="mt-2 ml-5">
                        <li><span className="font-semibold text-[rgb(253,84,120)]">Eco-Friendly Materials:</span>  We use organic cotton, recycled polyester, bamboo, and other planet-friendly fabrics.</li>
                        <li><span className="font-semibold text-[rgb(253,84,120)]">Ethical Manufacturing:</span>  Every piece is produced in fair-wage factories with safe working environments.</li>
                        <li><span className="font-semibold text-[rgb(253,84,120)]">Low Carbon Impact:</span> We prioritize renewable energy, water-saving techniques, and low-emission processes in our production.</li>
                    </ul>
                </div>
                <div className="text-left">
                    <h6 className="text-lg font-semibold ">5. Exceptional Customer Service That Cares</h6>
                    <p>You’re not just a customer — you’re family. Our team is here to support you every step of the way with care, expertise, and real-time help.</p>
                    <ul className="mt-2 ml-5">
                        <li><span className="font-semibold text-[rgb(253,84,120)]">Personalized Styling Support:</span>  Need fashion advice? Our team helps you find the perfect pieces based on your style and needs.</li>
                        <li><span className="font-semibold text-[rgb(253,84,120)]">Worry-Free Returns:</span>  Not satisfied? No stress. Our return & exchange process is simple and smooth.</li>
                        <li><span className="font-semibold text-[rgb(253,84,120)]">Loyalty Rewards:</span> Enjoy perks like early access to new drops, exclusive discounts, and surprise gifts as a valued customer.</li>
                    </ul>
                </div>
                <div className="text-left">
                    <h6 className="text-lg font-semibold ">6. Affordable Luxury — Because You Deserve Both</h6>
                    <p>We believe luxury should be lived, not just admired. That’s why we offer premium fashion at prices that are accessible.</p>
                    <ul className="mt-2 ml-5">
                        <li><span className="font-semibold text-[rgb(253,84,120)]">Fair & Transparent Pricing:</span>  Designer-worthy quality without designer price tags.</li>
                        <li><span className="font-semibold text-[rgb(253,84,120)]">Value-Packed Purchases:</span>  Every piece is an investment in quality, confidence, and timeless style.</li>
                        <li><span className="font-semibold text-[rgb(253,84,120)]">Seasonal Sales & Deals:</span> Enjoy exclusive promotions to elevate your wardrobe without overspending.</li>
                    </ul>
                </div>
                <div className="text-left">
                    <h6 className="text-lg font-semibold ">7. Exclusive Collections You Won’t Find Anywhere Else</h6>
                    <p>Our collections are designed to be *different*. Limited drops and signature edits ensure you wear what no one else is wearing.</p>
                    <ul className="mt-2 ml-5">
                        <li><span className="font-semibold text-[rgb(253,84,120)]">Limited Edition Pieces:</span>  Shop one-of-a-kind items that won’t be restocked.</li>
                        <li><span className="font-semibold text-[rgb(253,84,120)]">Designer Collaborations:</span>  We team up with emerging and established designers to craft truly unique collections.</li>
                        <li><span className="font-semibold text-[rgb(253,84,120)]">Constantly Evolving Styles:</span> We refresh our catalog with every season, so your style stays fresh, relevant, and exciting.</li>
                    </ul>
                </div>
                <div className="text-left">
                    <h6 className="text-lg font-semibold ">8. A Community-Driven Brand Built on Real Connections</h6>
                    <p>LXS Store isn’t just a brand — it’s a movement. We’re proud to build a fashion-forward community where creativity thrives and voices are heard.</p>
                    <ul className="mt-2 ml-5">
                        <li><span className="font-semibold text-[rgb(253,84,120)]">Social Media Love:</span>  Connect with us on socials for behind-the-scenes looks, styling tips, and inspiring content.</li>
                        <li><span className="font-semibold text-[rgb(253,84,120)]">Events & Workshops:</span>  We host digital and physical events to foster deeper connections with fashion lovers like you.</li>
                        <li><span className="font-semibold text-[rgb(253,84,120)]">You Speak, We Listen:</span> Customer feedback shapes our collections, policies, and innovations.</li>
                    </ul>
                </div>
                <div className="text-left">
                    <h6 className="text-lg font-semibold ">9. Seamless Shopping That Fits Your Lifestyle</h6>
                    <p>From easy browsing to doorstep delivery, we’ve streamlined every step of your shopping journey.</p>
                    <ul className="mt-2 ml-5">
                        <li><span className="font-semibold text-[rgb(253,84,120)]">Intuitive Website:</span>  Clean interface, crystal-clear photos, and smart filters make shopping a breeze.</li>
                        <li><span className="font-semibold text-[rgb(253,84,120)]">Reliable Shipping:</span>  Enjoy fast delivery, live tracking, and guaranteed safety on every order.</li>
                        <li><span className="font-semibold text-[rgb(253,84,120)]">Secure Checkout:</span> Advanced encryption protects your data, with flexible payment options for your ease.</li>
                    </ul>
                </div>
                <div className="text-left">
                    <h6 className="text-lg font-semibold ">10. Loved by Thousands, Trusted by You</h6>
                    <p>Our customers say it best — and we’re proud to be their chosen destination for fashion that delivers on every front.</p>
                    <ul className="mt-2 ml-5">
                        <li><span className="font-semibold text-[rgb(253,84,120)]">5-Star Satisfaction:</span>  Real reviews rave about our fabric quality, perfect fits, and unbeatable service.</li>
                        <li><span className="font-semibold text-[rgb(253,84,120)]">Word-of-Mouth Magic:</span>  Our community grows organically through happy shoppers sharing the love.</li>
                        <li><span className="font-semibold text-[rgb(253,84,120)]">Real Testimonials:</span> See what people are saying — their stories are our proof of promise.</li>
                    </ul>
                </div>
                <h3 className="text-[40px] font-extrabold">Join LXS Store today and explore a universe of opportunities!</h3>
                <p>By choosing <span className="font-semibold">LXS Store</span>, you’re not just shopping — you’re investing in a brand that stands for authenticity, quality, and sustainability. Your satisfaction is our highest priority, and we’re here to make sure every experience with us is exceptional.</p>
                <h6 className="text-2xl font-bold mb-10">Welcome to the LXS family — let’s redefine this universe together.</h6>
            </div>
        </div>
    )
}

export default AboutUs
