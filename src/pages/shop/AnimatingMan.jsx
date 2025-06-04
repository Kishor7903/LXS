

function AnimatingMan({className, borderClassName, children}) {
  return (
    <>
        <div className={`border-x border-b border-black w-[88vw] md:w-[92vw] mx-auto text-base lg:text-2xl text-semibold flex justify-center items-center ${className}`}> Here 3D Character shows animation {children}</div>
        <div className={`trapezoid ${borderClassName}`}></div>
    </>
  )
}

export default AnimatingMan
