import RecentProductsPage from '@/components/RecentProductsPage'
import YourMayAlsoLikeThesePage from '@/components/YourMayAlsoLikeThesePage'
import CartPage from '@/pages/shop/CartPage'
import { useSelector } from 'react-redux'

function CartPageLayout() {
  let { user } = useSelector(state => state.auth);
  return (
    <>
        <CartPage />
        <YourMayAlsoLikeThesePage data={null} />
        {
          user &&
        <RecentProductsPage />
        }
    </>
  )
}

export default CartPageLayout
