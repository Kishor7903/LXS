import { useSelector } from "react-redux"
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";


function YourMayAlsoLikeThesePage({ data, category=false }) {
  let { products } = useSelector(state => state.admin);
  let [similarProducts, setSimilarProducts] = useState([]);
  
  useEffect(() => {
    if(category){
      setSimilarProducts(() => {return products.filter(p => {
        return data?.some(i => i.category === p.category || i.subCategory === p.subCategory || i.brand === p.brand && i.id !== p.id)
     })})
    }else{
      setSimilarProducts(() => {return products.filter(p => p.subCategory === data?.subCategory && p.id !== data?.id)}) 
    }
  }, [products, data])
  

  return (
    <div className={`py-5 space-y-2 lg:space-y-5 lg:px-12 xl:px-14 border-t flex-col items-center ${similarProducts?.length > 0 ? "flex" : "hidden"}`}>
      <h2 className='text-xl md:text-3xl font-bold relative after:h-1 after:absolute after:w-2/3 after:left-14 after:-bottom-[5px] after:bg-[rgb(8,43,61)] after:rounded-full'>You May Also Like these!</h2>

      <div className="h-auto w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-3 gap-y-4 md:gap-x-5 md:gap-y-5 lg:gap-x-6 lg:gap-y-6 xl:gap-x-7 xl:gap-y-8 py-2 lg:py-1">
        {
          similarProducts?.slice(0, 6).map((item) => {
            return (
              <ProductCard key={item.id} item={item} />
            )
          })
        }
      </div>

    </div>
  )
}

export default YourMayAlsoLikeThesePage
