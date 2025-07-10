import ProductNotAvailable from '@/components/ProductNotAvailable';
import YourMayAlsoLikeThesePage from '@/components/YourMayAlsoLikeThesePage'
import { getSingleProductData } from '@/firebase/admin';
import InfoIconsContainer from '@/pages/shop/InfoIconsContainer'
import ProductDetailsPage from '@/pages/shop/ProductsDetailsPage'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function ProductDetailsPageLayout() {
	const { id } = useParams();
	let [data, setData] = useState(null);
	let [isProductAvailable, setIsProductAvailable] = useState(true);
	let { products } = useSelector(state => state.admin);

	useEffect(() => {
		let d = products.some(p => p.id === id);
		setIsProductAvailable(d)
	}, [])

	useEffect(() => {
		getSingleProductData(id).then((res) => {
			if (res) {
				setData(res);
			}
		})
	}, [id])

	return (
		<>
			{/* {
				isProductAvailable ? (
					<>
						<ProductDetailsPage id={id} data={data} />
						{
							data &&
							<YourMayAlsoLikeThesePage data={data} />
						}
						<InfoIconsContainer />
					</>
				)
					:
					<ProductNotAvailable />
			} */}
			<ProductDetailsPage id={id} data={data} />
			{
				data &&
				<YourMayAlsoLikeThesePage data={data} />
			}
			<InfoIconsContainer />

		</>
	)
}

export default ProductDetailsPageLayout
