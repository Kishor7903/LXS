import RecentProductsPage from '@/components/RecentProductsPage'
import AddressPage from '@/pages/shop/AddressPage'
import React from 'react'
import { useSelector } from 'react-redux'

function AddressPageLayout() {
  let { user } = useSelector(state => state.auth);
  return (
    <>
      <AddressPage />
      {
        user &&
        <RecentProductsPage />
      }
    </>
  )
}

export default AddressPageLayout
