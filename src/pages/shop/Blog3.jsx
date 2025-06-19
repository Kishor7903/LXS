import React from 'react'
import { Link } from 'react-router-dom'

function Blog3() {
    return (
        <div className='mx-24 my-10 tracking-wide leading-[1.4]'>
            <h2 className='text-3xl font-semibold'>Meet the Team Behind LXS: The Visionaries Fueling the Galaxy</h2>

            <p className='mt-8 italic'><span className='font-semibold'>A Brand as Bold as the Stars Needs a Team That Burns Bright </span>
                At the heart of the <span className="font-semibold">LXS Store</span>, beyond the workflows and sci-fi stories, lies a <span className="font-semibold">dynamic team of passionate</span>
                individuals who bring the entire universe to life. Each member is like a planet in our orbit, contributing their own
                creative gravity and expertise to shape the LXS universe. <br />
                Together, they merge <span className="font-semibold">creativity, technical brilliance</span> , and <span className="font-semibold">operational excellence</span> to push the boundaries of
                fashion, storytelling, and technology. From concept to customer, every piece of the puzzle is handled with
                precision and enthusiasm. <br />
                This blog introduces you to the <span className="font-semibold">key minds behind LXS</span> — the dreamers, doers, and creators — and reveals the
                missions that drive them.
            </p>

            <hr className='border-2 my-5 border-[rgb(8,43,61,0.8)] rounded-xl' />

            <ol className='list-decimal'>
                <li className='pl-5 ml-5'><p className='font-semibold'> Founder, CEO & Creative Director — Sachin Kumar</p>
                    <p className="font-semibold">Visionary | Sci-Fi Storyteller | 3D Artist | Brand Strategist</p>
                    <p>Sachin is the architect of the LXS multiverse — the visionary shaping the brand’s identity and universe. His passion for <span className="font-semibold">space aesthetics, futuristic fashion</span>, and <span className="font-semibold">immersive storytelling</span> fuels everything LXS represents.</p>
                    <p className='font-semibold'>Key Responsibilities:</p>
                    <ul className='list-disc ml-5'>
                        <li className='pl-5'><span className="font-semibold">Creative Direction: </span>Defines the visual tone, branding, and storytelling across all platforms.</li>
                        <li className='pl-5'><span className="font-semibold">CEO Role:</span>Leads strategic growth, partnerships, and high-level decisions.</li>
                        <li className='pl-5'><span className="font-semibold">Universe Builder: </span>Creates original characters, planets, and lore for the LXS multiverse.</li>
                        <li className='pl-5'><span className="font-semibold">3D Design & Modeling:  </span>Defines the visual tone, branding, and storytelling across all platforms.</li>
                        <li className='pl-5'><span className="font-semibold">Brand Strategy:  </span> Aligns creative vision with marketing and user experience.</li>
                        <li className='pl-5'><span className="font-semibold">Project Oversight  </span>Manages production workflows, web architecture, and business development.</li>
                    </ul>
                </li>
                <hr className='border-2 my-5 border-[rgb(8,43,61,0.8)] rounded-xl' />
                <li className='pl-5 ml-5'><p className='font-semibold'> Chief Operating Officer (COO) — Aditya Kumar</p>
                    <p className="font-semibold">Operations Lead | Strategic Planner | Workflow Architect</p>
                    <p>Aditya powers the <span className="font-semibold"> operational engine </span>, of the LXS Store, turning bold creative ideas into smooth-running business realities.</p>
                    <p className='font-semibold'>Key Responsibilities:</p>
                    <ul className='list-disc ml-5'>
                        <li className='pl-5'><span className="font-semibold">Operational Management:</span>Oversees product handling, suppliers, and workflows</li>
                        <li className='pl-5'><span className="font-semibold">Strategic Planning</span>Designs scalable systems for growth.</li>
                        <li className='pl-5'><span className="font-semibold">Execution: </span>Converts ideas into timelines and deliverables.</li>
                        <li className='pl-5'><span className="font-semibold">Team Coordination:  </span> Ensures seamless collaboration between departments.</li>
                        <li className='pl-5'><span className="font-semibold">Logistics Oversight: </span>Manages order fulfillment and inventory systems.</li>
                    </ul>
                </li>
                <hr className='border-2 my-5 border-[rgb(8,43,61,0.8)] rounded-xl' />
                <li className='pl-5 ml-5'><p className='font-semibold'> Web Developer — Kishore Kumar</p>
                    <p className="font-semibold">Frontend & Backend Developer | UI/UX Enthusiast | Platform Builder</p>
                    <p>Kishore constructs and maintains the <span className="font-semibold">digital foundation</span> of LXS Store — delivering a sleek, secure, and futuristic
shopping experience.</p>
                    <p className='font-semibold'>Key Responsibilities:</p>
                    <ul className='list-disc ml-5'>
                        <li className='pl-5'><span className="font-semibold">Full Stack Development: </span>Builds the site with React, Node.js, Firebase, and other tools.</li>
                        <li className='pl-5'><span className="font-semibold">User Interface Design: </span>Crafts a smooth, intuitive, and brand-consistent user experience.</li>
                        <li className='pl-5'><span className="font-semibold">Security & Speed: </span> Ensures top-tier performance and safe transactions.</li>
                        <li className='pl-5'><span className="font-semibold">Feature Integration  </span>Adds cutting-edge tools like AR/VR, user accounts, and tracking systems.</li>
                        <li className='pl-5'><span className="font-semibold">Scalability Focus:  </span>Builds the tech needed for future marketplace and community expansion.</li>
                    </ul>
                </li>
                <hr className='border-2 my-5 border-[rgb(8,43,61,0.8)] rounded-xl' />
                <li className='pl-5 ml-5'><p className='font-semibold'>  Virtual Design Team — 3D Artists, Animators & Developers</p>
                    <p className="font-semibold">Blender Wizards | Animation Pros | UI/UX Innovators</p>
                    <p>This powerhouse of creators transforms ideas into <span className="font-semibold">breathtaking visuals</span>, animations, and immersive experiences
that bring <span className="font-semibold">Lupin</span> and the <span className="font-semibold">LXS universe</span> to life.</p>
                    <p className='font-semibold'>Their Contributions:</p>
                    <ul className='list-disc ml-5'>
                        <li className='pl-5'>Model and rig characters with lifelike precision.</li>
                        <li className='pl-5'>Create hyper-realistic, space-themed product mockups.</li>
                        <li className='pl-5'>Produce animated narratives for social media and YouTube.</li>
                        <li className='pl-5'>Integrate 3D into the UI for upcoming AR/VR features.</li>
                    </ul>
                </li>
                <hr className='border-2 my-5 border-[rgb(8,43,61,0.8)] rounded-xl' />
                <li className='pl-5 ml-5'><p className='font-semibold'> Operations & Support Team — The Ground Control</p>
                    <p className="font-semibold">Customer Support | Fulfillment | Quality Assurance</p>
                    <p>Behind every cosmic creation is a <span className="font-semibold">dedicated team</span> ensuring <span className="font-semibold">stellar service</span> on Earth.</p>
                    <p className='font-semibold'>Their Roles:</p>
                    <ul className='list-disc ml-5'>
                        <li className='pl-5'>Manage customer inquiries, returns, and support tickets.</li>
                        <li className='pl-5'>Conduct quality checks with third-party manufacturers.</li>
                        <li className='pl-5'>Handle order tracking, fulfillment, and logistics.</li>
                    </ul>
                </li>
                <hr className='border-2 my-5 border-[rgb(8,43,61,0.8)] rounded-xl' />
                <li className='pl-5 ml-5'><p className='font-semibold'> Marketing & Content Team — The Signal Boosters</p>
                    <p className="font-semibold">Social Media Strategists | Content Creators | SEO Specialists</p>
                    <p>These stars amplify the <span className="font-semibold">LXS story </span> — building a thriving galaxy-wide community.</p>
                    <p className='font-semibold'>Their Key Functions:</p>
                    <ul className='list-disc ml-5'>
                        <li className='pl-5'>Craft engaging blogs, newsletters, and social content.</li>
                        <li className='pl-5'>Coordinate influencer collabs and community campaigns.</li>
                        <li className='pl-5'>Optimize for SEO and grow organic traffic.</li>
                        <li className='pl-5'>Launch ad campaigns featuring Lupin as the brand face.</li>
                    </ul>
                </li>
            </ol>

            <hr className='border-2 my-5 border-[rgb(8,43,61,0.8)] rounded-xl' />

            <h5 className='text-lg font-semibold'>The LXS Culture — A Brand Beyond Work</h5>
            <p>Our team doesn’t just make fashion — they build <span className='font-semibold'>narratives, communities, and immersive experiences</span>  that inspire.</p>
            <p className='font-semibold'>We’re United By:</p>
            <ul className='list-disc ml-5'>
                <li className='pl-5'>A shared love for sci-fi, space, and storytelling.</li>
                <li className='pl-5'>A passion for innovation, creativity, and collaboration.</li>
                <li className='pl-5'>The drive to create something truly <span className="font-semibold">intergalactic</span> and impactful.</li>
            </ul>

            <hr className='border-2 my-5 border-[rgb(8,43,61,0.8)] rounded-xl' />

            <h5 className='text-lg font-semibold'>Want to Collaborate or Join the LXS Crew?</h5>
            <p>We’re always seeking <span className='font-semibold'>talented creatives and professionals</span> to join our orbit in these categories:</p>
            <p className="font-semibold">Creative & 3D Arts:</p>
            <ul className='list-disc ml-5'>
                <li className='pl-5'>3D Modelers</li>
                <li className='pl-5'>Animators</li>
                <li className='pl-5'>Texture Artists</li>
                <li className='pl-5'>Concept Designers</li>
                <li className='pl-5'>VFX Experts</li>
            </ul>
            <p className="font-semibold">Fashion & Product Design:</p>
            <ul className='list-disc ml-5'>
                <li className='pl-5'>Fashion Designers</li>
                <li className='pl-5'>Textile & Print Artists</li>
                <li className='pl-5'>Merch Stylists</li>
            </ul>
            <p className="font-semibold">Story & Brand Development:</p>
            <ul className='list-disc ml-5'>
                <li className='pl-5'>Sci-Fi Writers</li>
                <li className='pl-5'>Comic Artists</li>
                <li className='pl-5'>Scriptwriters</li>
                <li className='pl-5'>Voiceover Talent</li>
            </ul>
            <p className="font-semibold">Content & Marketing:</p>
            <ul className='list-disc ml-5'>
                <li className='pl-5'>Social Media Managers</li>
                <li className='pl-5'>Video Editors</li>
                <li className='pl-5'>SEO Experts</li>
                <li className='pl-5'>Influencers</li>
            </ul>
            <p className="font-semibold">Web & Tech:</p>
            <ul className='list-disc ml-5'>
                <li className='pl-5'>Web Developers</li>
                <li className='pl-5'>UI/UX Designers</li>
                <li className='pl-5'>AR/VR Developers</li>
                <li className='pl-5'>Security Specialistss</li>
            </ul>
            <p className="font-semibold">Operations & Business:</p>
            <ul className='list-disc ml-5'>
                <li className='pl-5'>Logistics Managers</li>
                <li className='pl-5'>Customer Support Specialists</li>
                <li className='pl-5'>Business Developers</li>
                <li className='pl-5'>Legal Advisors</li>
            </ul>

            <hr className='border-2 my-5 border-[rgb(8,43,61,0.8)] rounded-xl' />

            <h5 className='text-lg font-semibold'>How to Apply or Collaborate</h5>
            <ul className='list-disc ml-5'>
                <li className='pl-5'>Visit our <span className="font-semibold">Job Page</span> (coming soon)</li>
                <li className='pl-5'>Email your portfolio/resume: <span className="font-semibold">[Insert Email Here]</span></li>
                <li className='pl-5'>DM us on Instagram: <Link to="" className='text-blue-600 underline'>@lxslifestylestore</Link></li>
                <li className='pl-5'>Connect via LinkedIn: <Link to="" className='font-semibold'>LXS Store</Link></li>
            </ul>

            <hr className='border-2 my-5 border-[rgb(8,43,61,0.8)] rounded-xl' />

            <h5 className='text-lg font-semibold'>We Believe in Creators Who:</h5>
            <ul className='list-disc ml-5'>
                <li className='pl-5'>Think like visionaries</li>
                <li className='pl-5'>Work with passion and purpose</li>
                <li className='pl-5'>Learn, adapt, and innovate</li>
                <li className='pl-5'>Love storytelling, aesthetics, and tech</li>
                <li className='pl-5'>Want to build a legacy bigger than a brand</li>
            </ul>

            <hr className='border-2 my-5 border-[rgb(8,43,61,0.8)] rounded-xl' />

            <h5 className='text-lg font-semibold'>Final Word</h5>
            <p className='font-semibold'>The <span className="font-semibold">stars may guide us</span> , but the <span className="font-semibold">team behind LXS</span> is the true engine driving this universe forward. Fueled by <span className="font-semibold">passion, imagination, and relentless innovation</span>, we’re building more than a store — we’re crafting a <span className="font-semibold">space- fueled legacy</span> and inviting you to join us on this <span className="font-semibold">cosmic journey</span></p>

        </div>
    )
}

export default Blog3
