import img1 from "../../assets/infoIcons/Trusted Website.png"
import img2 from "../../assets/infoIcons/Return & Exchange.png"
import img3 from "../../assets/infoIcons/Delivery.png"
import img4 from "../../assets/infoIcons/Invoive.png"
import img5 from "../../assets/infoIcons/Secure Payment.png"

function InfoIconsContainer() {
  const items = [
    {
      text1: "100%",
      text2: "Trusted Website",
      image: img1
    },
    {
      text1: "Easy",
      text2: "Return & Exchange",
      image: img2
    },
    {
      text1: "Delivery",
      text2: "All Over India",
      image: img3
    },
    {
      text1: "100%",
      text2: "Original Billing & invoice",
      image: img4
    },
    {
      text1: "100%",
      text2: "Secure Payments",
      image: img5
    }
  ];

  return (
    <div className="w-full flex justify-around items-center flex-1 border-y pt-3 pb-2">
      {
        items.map((item, index) => {
          return (
            <div key={index} className="w-1/5 flex flex-col items-center text-sm h-[80%]">
              <img src={item.image} alt="" className='h-8 md:h-12 lg:h-10' />
              <span className='font-extrabold text-[0.6em] md:text-xs lg:text-xs'>{item.text1}</span>
              <p className='relative -top-3 -md:top-2 sm:-top-1 text-[6px] md:text-xs lg:text-xs'>{item.text2}</p>
            </div>
          )
        })
      }
    </div>
  )
}

export default InfoIconsContainer;
