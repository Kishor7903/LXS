import ProductCard from "@/components/ProductCard";
import { getAllRecentPoducts } from "@/firebase/auth"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"


function RecentViewedProducts() {
    let [product, setProduct] = useState([]);
    let { user } = useSelector(state => state.auth);
    let { products } = useSelector(state => state.admin);

    useEffect(() => {
        getAllRecentPoducts(user.id).then((res) => {
            let items = res.map(item => {
                let prods = products.find(p => p.id === item.item_id)
                return prods ? {...prods} : null
            }).filter(item => item !== null);

            setProduct(items)
        })
    }, [])
  return (
    <div className='space-y-2 lg:space-y-1 px-5 md:px-8 lg:px-12 xl:px-16 border-t py-5 flex flex-col gap-0 lg:gap-2 pb-10 bg-white'>

        <h2 className='text-xl md:text-3xl font-bold relative after:h-1 after:absolute after:w-80 after:-bottom-1 after:left-6 after:bg-[rgb(8,43,61)] after:rounded-full self-center'>Recently Viewed Products</h2>

            <div className="h-auto w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-4 md:gap-x-5 md:gap-y-5 lg:gap-x-6 lg:gap-y-6 xl:gap-x-7 xl:gap-y-8 py-4 lg:pt-5">
                    {
                        product.map((item) => {
                            return (
                                <ProductCard item={item} />
                            )
                        })
                    }
                </div>

        </div>
  )
}

export default RecentViewedProducts
