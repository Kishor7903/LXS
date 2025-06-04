

function YourMayAlsoLikeThesePage() {
    
  return (
    <div className="py-5 space-y-2 lg:space-y-5 lg:px-12 xl:px-14 border-t flex flex-col items-center">
        <h2 className='text-xl md:text-3xl font-bold relative after:h-1 after:absolute after:w-2/3 after:left-14 after:-bottom-1 after:bg-[rgb(8,43,61)] after:rounded-full'>You May Also Like These!</h2>

        {/* <div className="h-auto w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-x-3 gap-y-4 md:gap-x-5 md:gap-y-5 lg:gap-x-6 lg:gap-y-6 xl:gap-x-7 xl:gap-y-8 py-2 lg:py-1">
                {
                    products.map((item,index) => {
                        return (
                            <div key={index} className='w-full h-full'><ProductCard item={item} /></div>
                        )
                    })
                }
            </div> */}

    </div>
  )
}

export default YourMayAlsoLikeThesePage
