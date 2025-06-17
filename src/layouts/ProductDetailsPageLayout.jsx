import YourMayAlsoLikeThesePage from '@/components/YourMayAlsoLikeThesePage'
import { getSingleProductData } from '@/firebase/admin';
import InfoIconsContainer from '@/pages/shop/InfoIconsContainer'
import ProductDetailsPage from '@/pages/shop/ProductsDetailsPage'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetailsPageLayout() {
	const { id } = useParams();
	let [data, setData] = useState(null);

	useEffect(() => {
		getSingleProductData(id).then((res) => {
			if (res) {
				setData(res);
			}
		})
	}, [id])

  return (
	<>
	  <ProductDetailsPage id={id} data={data} />
	  <YourMayAlsoLikeThesePage data={data} />
	  <InfoIconsContainer />
	</>
  )
}

export default ProductDetailsPageLayout
