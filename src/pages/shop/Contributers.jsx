import ContributersImage from "@/components/ContributersImage"


function Contributers() {
    return (
        <div className="p-5 lg:pt-10 space-y-2 lg:space-y-5 px-10 md:px-20 lg:px-24 xl:px-48 flex flex-col items-center">

            <h2 className='text-xl md:text-3xl font-bold relative after:h-1 after:absolute after:w-2/3 after:left-3 after:bottom-0 after:bg-[rgb(8,43,61)] after:rounded-full'>LEADS!</h2>

            <div className="flex flex-col md:flex-row md:items-end justify-center md:justify-between pt-5 lg:pb-5 lg:gap-44">

                <ContributersImage imgClassName="p-10 md:p-16 lg:p-22 xl:p-28" className="hidden md:block" imgText="COO, SCM" contributerName="Aditya Kumar" />

                <ContributersImage imgClassName="p-16 md:p-22 lg:p-30 xl:p-36" imgText="Founder, CEO" contributerName="Sachin Kumar" />

                <ContributersImage imgClassName="p-10 md:p-16 lg:p-22 xl:p-28" className="hidden md:block" imgText="Web & App Dev" contributerName="Kishore Kumar" />

                <div className="flex md:hidden gap-20 w-[100vw] justify-center">

                    <ContributersImage imgClassName="h-24 w-24 " imgText="COO, SCM" contributerName="Aditya Kumar" />

                    <ContributersImage imgClassName="h-24 w-24 " imgText="Web & App Dev" contributerName="Kishore Kumar" />

                </div>

            </div>

        </div>
    )
}

export default Contributers
