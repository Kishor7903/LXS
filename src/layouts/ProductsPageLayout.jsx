import RecentProductsPage from '@/components/RecentProductsPage'
import ProductsContainer from '@/pages/products/ProductsContainer'
import InfoIconsContainer from '@/pages/shop/InfoIconsContainer'

function ProductsPageLayout() {
  return (
    <>
      <ProductsContainer />
      <RecentProductsPage />
      <InfoIconsContainer />
    </>
  )
}

export default ProductsPageLayout
