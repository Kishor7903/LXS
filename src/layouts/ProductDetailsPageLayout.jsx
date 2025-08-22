import ProductNotAvailable from '@/components/ProductNotAvailable';
import RecentProductsPage from '@/components/RecentProductsPage';
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
	let { user } = useSelector(state => state.auth);

	useEffect(() => {
		let d = products.some(p => p.id === id);
		setIsProductAvailable(d)
	}, [])

	useEffect(() => {
		let product = products.find((item) => item.id === id);
		setData(product)
	}, [id, products])

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
			{
				user &&
				<RecentProductsPage id={id} />
			}
			<InfoIconsContainer />

		</>
	)
}

export default ProductDetailsPageLayout
