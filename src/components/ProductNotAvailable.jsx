import { Link } from 'react-router-dom'

function ProductNotAvailable() {
  return (
    <div className='min-h-[55.3vh] flex flex-col justify-center items-center'>
        <i className="fi fi-sr-404 text-[100px] opacity-70 relative top-5"></i>
        <h6 className='text-xl font-semibold opacity-70'>Product Not Found...</h6>
        <p className='opacity-70 font-medium'>Oops! This item is no longer available. It’s either been discontinued or removed from our store</p>
        <p className='font-semibold text-lg mt-5'>No Worries : <Link to="/products" className="text-blue-600 lg:hover:underline">Find Similar Product</Link></p>
    </div>
  )
}

export default ProductNotAvailable
