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
                                                <p key={idx}><i className="fi fi-sr-badge-check text-green-700 relative top-[8px] text-3xl"></i> <span className="opacity-60">{point}</span></p>
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
                <h3 className="text-[40px] font-extrabold mb-10">Join LXS Store today and explore a universe of opportunities!</h3>
            </div>
        </div>
    )
}

export default AboutUs
