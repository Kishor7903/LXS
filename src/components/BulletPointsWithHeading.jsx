

function BulletPointsWithHeading({heading, subHeading, points}) {
    return (
        <>
            {
                heading ? (<span className="font-bold">{heading}</span>): null
            }
            <br />
            {
                subHeading ? (<span className="relative bottom-1 left-8">{subHeading}</span>) : null
            }
            <ul className="list-disc list-inside space-y-1 leading-5 pl-14 -indent-[22px] mb-5">
                {
                    points?.map((item,index) => (
                        <li key={index}>{item}</li>
                    ))
                }
            </ul>
        </>
    )
}

export default BulletPointsWithHeading
