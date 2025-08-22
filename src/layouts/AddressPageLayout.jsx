import RecentProductsPage from '@/components/RecentProductsPage'
import YourMayAlsoLikeThesePage from '@/components/YourMayAlsoLikeThesePage';
import AddressPage from '@/pages/shop/AddressPage'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function AddressPageLayout() {
  let { user } = useSelector(state => state.auth);
  let { products } = useSelector(state => state.admin);
  let [data, setData] = useState([]);
  let cartItems = JSON.parse(localStorage.getItem("cart"));

  useEffect(() => {
		let product = products.filter(p => {
      return cartItems.some(i => i.item_id === p.id)
    })
		setData(product)
	}, [products])

  return (
    <>
      <AddressPage cartItems={cartItems} />
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

export default AddressPageLayout
