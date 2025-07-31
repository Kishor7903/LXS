import RecentProductsPage from '@/components/RecentProductsPage'
import ProductsContainer from '@/pages/products/ProductsContainer'
import InfoIconsContainer from '@/pages/shop/InfoIconsContainer'
import { useSelector } from 'react-redux'

function ProductsPageLayout() {
  let { user } = useSelector(state => state.auth);
  return (
    <>
      <ProductsContainer />
      {
        user &&
        <RecentProductsPage />
      }
      <InfoIconsContainer />
    </>
  )
}

export default ProductsPageLayout
