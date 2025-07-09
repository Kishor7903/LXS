import RecentProductsPage from '@/components/RecentProductsPage'
import YourMayAlsoLikeThesePage from '@/components/YourMayAlsoLikeThesePage'
import CartPage from '@/pages/shop/CartPage'

function CartPageLayout() {
  return (
    <>
        <CartPage />
        <YourMayAlsoLikeThesePage data={null} />
        <RecentProductsPage />
    </>
  )
}

export default CartPageLayout
