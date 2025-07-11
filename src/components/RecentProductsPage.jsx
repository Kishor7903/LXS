import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { useSelector } from 'react-redux';
import ViewAllIcon from './ViewAllIcon';

function RecentProductsPage() {
    let [recentProducts, setRecentProducts] = useState([]);
    let { products } = useSelector(state => state.admin);
    let { recentViewed } = useSelector(state => state.cart);

    useEffect(() => {
        let product = recentViewed.map(item => {
          let product = products.find(i => i.id === item.item_id)
          return product
        })
        setRecentProducts(product)
    }, [recentViewed]);

  return (
    <div className="py-5 g:px-12 xl:px-14 border-t flex flex-col items-center">
      <h2 className='text-xl md:text-3xl font-bold relative after:h-1 after:absolute after:w-2/3 after:left-14 after:-bottom-1 after:bg-[rgb(8,43,61)] after:rounded-full'>Recently Viewed Products!</h2>

      <ViewAllIcon navigate="/user/recent-viewed-products" className='relative bottom-1' />

      <div className="h-auto w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-4 md:gap-x-5 md:gap-y-5 lg:gap-x-6 lg:gap-y-6 xl:gap-x-7 xl:gap-y-8 py-2 lg:py-1">
        {
          recentProducts.slice(0, 5).map((item) => {
            return (
              <ProductCard key={item.id} item={item} />
            )
          })
        }
      </div>

    </div>
  )
}

export default RecentProductsPage
