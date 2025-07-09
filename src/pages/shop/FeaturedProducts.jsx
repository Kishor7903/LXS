import HeadingText from '@/components/HeadingText';
import TabSwitcher from '@/components/TabSwitcher'
import ViewAllIcon from '@/components/ViewAllIcon';
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import ProductCard from '@/components/ProductCard';

function FeaturedProducts() {
    const tabs = ["Best Selling", "New Arrival", "LXS Originals"];
    const [activeTab, setActiveTab] = useState(tabs[0]);
    let { products } = useSelector(state => state.admin);
    let [product, setProduct] = useState(products);

    useEffect(() => {
        if (activeTab === tabs[1] && products.length > 0) {
            let sortedProducts = [...products].sort((a, b) => {
                return new Date(b.timestamp) - new Date(a.timestamp);
            });
            setProduct(sortedProducts);
        }
        else if(activeTab === tabs[2] && products.length > 0){
            let filteredProducts = [...products].filter((item) => item.brand === "LXS Originals")
            setProduct(filteredProducts);
        }
        else{
            setProduct(products);
        }
    }, [products, activeTab])
    

    return (
        <div className='space-y-2 lg:space-y-1 px-5 md:px-8 lg:px-12 xl:px-16 border-t py-5 flex flex-col gap-0 lg:gap-2'>

            <HeadingText name="Featured Products" />

            <TabSwitcher activeTab={activeTab} setActiveTab={setActiveTab} layoutId="feature-product" tabs={tabs} />

            <ViewAllIcon navigate="/products" className="hidden md:flex" />

            <div className="h-auto w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-4 md:gap-x-5 md:gap-y-5 lg:gap-x-6 lg:gap-y-6 xl:gap-x-7 xl:gap-y-8 py-2 lg:py-1">
                    {
                        product.slice(0,10).map((item) => {
                            return (
                                <ProductCard key={item.id} item={item} />
                            )
                        })
                    }
                </div>

            <ViewAllIcon navigate="/products" className="flex md:hidden" />

        </div>
    )
}

export default FeaturedProducts
