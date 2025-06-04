import HeadingText from "@/components/HeadingText"
import ViewAllIcon from "@/components/ViewAllIcon"


function LXSHighlight() {
  return (
    <div className='border-t mt-5 py-5'>
            <HeadingText name="LXS Highlights" className="text-[40px]" />
            <div className="w-full px-16 flex flex-col">
                <ViewAllIcon navigate="#" className="hidden md:flex" />
                <div className="flex gap-10 h-[480px] mt-1">
                    <div className="w-[42.5%]">
                        <h4 className="text-xl font-bold">Why LXS Store is More Than Just a Brand - It's a Movement!</h4>
                        <p className="text-sm opacity-70 relative bottom-1 text-right">15 February, 2025</p>
                        <p className="leading-5 mt-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae illum eveniet eum fugiat impedit ratione incidunt temporibus odio obcaecati alias omnis amet fugit dolor, eius facilis unde perferendis mollitia officiis similique ea nemo veritatis quidem libero qui? Ipsam tenetur laboriosam consequatur minus, similique repellat nemo, dolorum rerum repellendus dicta recusandae.</p>
                        <h6 className="mt-7 text-xl font-semibold">Conclusion: The Future is Now</h6>
                        <p className="leading-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae impedit, voluptas velit nam ipsam veniam sequi atque eum tempora voluptatem ipsa ipsum sed dolor quia deserunt cum porro. Velit molestias voluptatum soluta iste sed explicabo.</p>
                        <p className="mt-3 leading-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam delectus vero quidem. Dolorem et itaque fugit sunt eveniet maxime iusto.</p>
                    </div>
                    <div className="h-full w-[32%] border border-[rgb(8,43,61)] rounded-2xl"></div>
                    <div className="w-[25%] h-full">
                        <div className="border border-[rgb(8,43,61)] rounded-2xl h-[60%]"></div>
                        <h6 className="text-xl font-semibold">Exclusive Sneak Peak</h6>
                        <p className="text-sm opacity-70 relative bottom-1">16 February, 2025</p>
                        <p className="leading-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem soluta consequatur ut! Quasi, repellendus? Dolore, similique veniam dicta ea odio quidem debitis distinctio facere et?</p>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default LXSHighlight
