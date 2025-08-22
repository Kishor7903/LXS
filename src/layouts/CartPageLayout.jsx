import RecentProductsPage from '@/components/RecentProductsPage'
import YourMayAlsoLikeThesePage from '@/components/YourMayAlsoLikeThesePage'
import CartPage from '@/pages/shop/CartPage'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'

function CartPageLayout() {
  let { user } = useSelector(state => state.auth);
  let { products } = useSelector(state => state.admin);
  let { cart } = useSelector(state => state.cart);
  let [data, setData] = useState([]);

  useEffect(() => {
		let product = products.filter(p => {
      return cart.some(i => i.item_id === p.id)
    })
		setData(product)
	}, [products, cart])

  
  return (
    <>
      <CartPage cart={cart} />
      {
        data && 
        <YourMayAlsoLikeThesePage data={data} category={true} />
      }
      {
        user &&
      <RecentProductsPage />
      }
    </>
  )
}

export default CartPageLayout
