import YourMayAlsoLikeThesePage from '@/components/YourMayAlsoLikeThesePage'
import CartPage from '@/pages/shop/CartPage'
import React from 'react'

function CartPageLayout() {
  return (
    <>
        <CartPage />
        <YourMayAlsoLikeThesePage data={null} />
    </>
  )
}

export default CartPageLayout
