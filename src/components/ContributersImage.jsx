

function ContributersImage({className, contributerName, imgClassName, imgSrc, imgText}) {
  return (
    <div className={`flex flex-col justify-center items-center ${className}`}>
      
      <img src={imgSrc} alt="" className={`rounded-full bg-blue-950 object-fill  ${imgClassName}`} />

      <h5 className="text-center text-base lg:text-xl font-bold">{contributerName}</h5>

      <p className="text-center font-medium text-xs lg:text-base xl:text-lg relative bottom-1 lg:bottom-2">({imgText})</p>

    </div>
  )
}

export default ContributersImage
