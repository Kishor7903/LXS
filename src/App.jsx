import { Route, Routes } from "react-router-dom"
import ShopLayout from "./layouts/ShopLayout"
import HomePageLayout from "./layouts/HomePageLayout"
import AdminLayout from "./layouts/AdminLayout"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminProducts from "./pages/admin/AdminProducts"
import AdminOrders from "./pages/admin/AdminOrders"
import AdminReviews from "./pages/admin/AdminReviews"
import AdminSellers from "./pages/admin/AdminSellers"
import AdminSettings from "./pages/admin/AdminSettings"
import ProductDetailsPageLayout from "./layouts/ProductDetailsPageLayout"
import { useEffect, useState } from "react"
import ShopSettingsLayout from "./layouts/ShopSettingsLayout"
import ShopSettingDashboard from "./pages/shop/ShopSettingDashboard"
import ShopSettingMyAccount from "./pages/shop/ShopSettingMyAccount"
import ShopSettingMyOrders from "./pages/shop/ShopSettingMyOrders"
import ShopSettingWishlist from "./pages/shop/ShopSettingWishlist"
import ShopSettingSavedAddresses from "./pages/shop/ShopSettingSavedAddresses"
import ShopSettingPaymentOptions from "./pages/shop/ShopSettingPaymentOptions"
import ShopSettingSubscriptions from "./pages/shop/ShopSettingSubscriptions"
import ShopSettingSettings from "./pages/shop/ShopSettingSettings"
import ShopSettingContactUs from "./pages/shop/ShopSettingContactUs"
import OrdersPageLayout from "./layouts/OrdersPageLayout"
import OrderDetailsPage from "./pages/shop/OrderDetailsPage"
import TrackPackage from "./pages/shop/TrackPackage"
import ProductReviewPage from "./pages/shop/ProductReviewPage"
import CartPage from "./pages/shop/CartPage"
import CheckoutLayout from "./layouts/CheckoutLayout"
import AddressPage from "./pages/shop/AddressPage"
import Notification from "./pages/shop/Notification"
import AccountPreference from "./pages/shop/AccountPreference"
import SecurityLogin from "./pages/shop/SecurityLogin"
import PrivacyData from "./pages/shop/PrivacyData"
import SellerProfile from "./pages/shop/SellerProfile"
import ProductExchange from "./pages/shop/ExchangeProduct"
import ProductReturn from "./pages/shop/ProductReturn"
import Notifications from "./pages/shop/Notifications"
import ShopSettingMyRatingsAndReviews from "./pages/shop/ShopSettingMyRatingsAndReviews"
import Blog from "./pages/shop/Blog"
import TrackReturnAndRefund from "./pages/shop/TrackReturnAndRefund"
import AboutUs from "./pages/shop/AboutUs"
import AllBlogs from "./pages/shop/AllBlogs"
import BulkOrder from "./pages/shop/BulkOrder"
import PrivacyPolicy from "./pages/shop/PrivacyPolicy"
import TermsAndCondition from "./pages/shop/TermsAndCondition"
import LegalCompliancePolicy from "./pages/shop/LegalCompliancePolicy"
import IntellectualPropertyPolicy from "./pages/shop/IntellectualPropertyPolicy"
import IntergalacticFrameworkPolicy from "./pages/shop/IntergalacticFrameworkPolicy"
import GeneralShoppingPolicy from "./pages/shop/GeneralShoppingPolicy"
import PaymentAndCheckoutPolicy from "./pages/shop/PaymentAndCheckoutPolicy"
import DiscountsAndPricingPolicy from "./pages/shop/DiscountsAndPricingPolicy"
import OrderCancellationPolicy from "./pages/shop/OrderCancellationPolicy"
import ShippingAndDeliveryPolicy from "./pages/shop/ShippingAndDeliveryPolicy"
import ReturnAndRefundPolicy from "./pages/shop/ReturnAndRefundPolicy"
import ExchangeAndReplacementPolicy from "./pages/shop/ExchangeAndReplacementPolicy"
import CustomerSupportAndComplaintResolutionPolicy from "./pages/shop/CustomerSupportAndComplaintResolutionPolicy"
import CustomerSupportAndCustomerDisputeResolutionPolicy from "./pages/shop/CustomerSupportAndCustomerDisputeResolutionPolicy"
import LoyaltyAndRewardProgramPolicy from "./pages/shop/LoyaltyAndRewardProgramPolicy"
import CommunityGuidelinesAndUserGeneratedContentPolicy from "./pages/shop/CommunityGuidelinesAndUserGeneratedContentPolicy"
import AffiliateAndInfluencerPolicy from "./pages/shop/AffiliateAndInfluencerPolicy"
import EnviromentalAndEthicalSourcingPolicy from "./pages/shop/EnviromentalAndEthicalSourcingPolicy"
import FAQs from "./pages/shop/FAQs"
import CheckAuth from "./layouts/CheckAuth"
import { useDispatch, useSelector } from "react-redux"
import { login } from "./store/features/authSlice"
import AdminCarousel from "./pages/admin/AdminCarousel"
import ScrollToTop from "./components/ScrollToTop"
import PolicyLayout from "./layouts/PolicyLayout"
import AdminNewsletter from "./pages/admin/AdminNewsletter"
import AdminWorkWithUs from "./pages/admin/AdminWorkWithUs"
import AdminTicketAndReports from "./pages/admin/AdminTicketAndReports"
import AdminRequestCall from "./pages/admin/AdminRequestCall"
import PaymentsPage from "./pages/shop/PaymentsPage"
import ProductsContainer from "./pages/products/ProductsContainer"
import EventGallery from "./pages/admin/EventGallery"

function App() {
	let {isAuthenticated, user} = useSelector(state => state.auth);
	let dispatch = useDispatch();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let user = JSON.parse(localStorage.getItem("user"));
		if(user){
			dispatch(login(user))
		}
		setLoading(false);
	}, [dispatch])

	if (loading) {
		return <div>Loading...</div>; // or a spinner/skeleton
	}

	return (
		<div className="h-screen w-full overflow-y-scroll scrollable-content">
			<ScrollToTop />
			<Routes>
				<Route path="/" element={
					<CheckAuth isAuthenticated={isAuthenticated} user={user} >
						<ShopLayout />
					</CheckAuth>
				} >
					<Route path="shop" element={<HomePageLayout />} />
					<Route path="products" element={<ProductsContainer />} />
					<Route path="product-details/:id" element={<ProductDetailsPageLayout />} />
					<Route path="blog" element={<Blog />} />
					<Route path="about-us" element={<AboutUs />} />
					<Route path="all-blogs" element={<AllBlogs />} />
					<Route path="bulk-order" element={<BulkOrder />} />
				</Route>
				<Route path="/policy" element={
					<CheckAuth isAuthenticated={isAuthenticated} user={user} >
						<PolicyLayout />
					</CheckAuth>
				} >
					<Route path="privacy-policy" element={<PrivacyPolicy />} />
					<Route path="terms-and-conditions" element={<TermsAndCondition />} />
					<Route path="legal-compliance" element={<LegalCompliancePolicy />} />
					<Route path="intellectual-property-policy" element={<IntellectualPropertyPolicy />} />
					<Route path="intergalactic-framework-policy" element={<IntergalacticFrameworkPolicy />} />
					<Route path="general-shopping-policy" element={<GeneralShoppingPolicy />} />
					<Route path="payments-and-checkout-policy" element={<PaymentAndCheckoutPolicy />} />
					<Route path="discounts-and-pricing-policy" element={<DiscountsAndPricingPolicy />} />
					<Route path="shipping-and-delivery-policy" element={<ShippingAndDeliveryPolicy />} />
					<Route path="order-cancellation-policy" element={<OrderCancellationPolicy />} />
					<Route path="return-and-refund-policy" element={<ReturnAndRefundPolicy />} />
					<Route path="exchange-and-replacemennt-policy" element={<ExchangeAndReplacementPolicy />} />
					<Route path="custumer-support-and-resolution-policy" element={<CustomerSupportAndComplaintResolutionPolicy />} />
					<Route path="custumer-support-and-dispute-resolution-policy" element={<CustomerSupportAndCustomerDisputeResolutionPolicy />} />
					<Route path="loyalty-and-reward-program" element={<LoyaltyAndRewardProgramPolicy />} />
					<Route path="affiliate-and-influencer-policy" element={<AffiliateAndInfluencerPolicy />} />
					<Route path="community-guidelines" element={<CommunityGuidelinesAndUserGeneratedContentPolicy />} />
					<Route path="enviromental-ethical-sourcing-policy" element={<EnviromentalAndEthicalSourcingPolicy />} />
					<Route path="FAQs" element={<FAQs />} />
				</Route>
				<Route path="/checkout" element={
					<CheckAuth isAuthenticated={isAuthenticated} user={user} >
						<CheckoutLayout />
					</CheckAuth>
				} >
					<Route path="cart" element={<CartPage />} />
					<Route path="address" element={<AddressPage />} />
					<Route path="payment" element={<PaymentsPage />} />
				</Route>
				<Route path="/setting" element={
					<CheckAuth isAuthenticated={isAuthenticated} user={user} >
						<ShopSettingsLayout />
					</CheckAuth>
				} >
					<Route path="dashboard" element={<ShopSettingDashboard />} />
					<Route path="my-account" element={<ShopSettingMyAccount />} />
					<Route path="my-orders" element={<ShopSettingMyOrders />} />
					<Route path="wishlist" element={<ShopSettingWishlist />} />
					<Route path="saved-addresses" element={<ShopSettingSavedAddresses />} />
					<Route path="payment-options" element={<ShopSettingPaymentOptions />} />
					<Route path="subscriptions" element={<ShopSettingSubscriptions />} />
					<Route path="my-ratings-reviews" element={<ShopSettingMyRatingsAndReviews />} />
					<Route path="settings" element={<ShopSettingSettings />} >
						<Route path="notification" element={<Notification />} />
						<Route path="account-preference" element={<AccountPreference />} />
						<Route path="Security-login" element={<SecurityLogin />} />
						<Route path="privacy-data" element={<PrivacyData />} />
					</Route>
					<Route path="contact-us" element={<ShopSettingContactUs />} />
				</Route>
				<Route path="/orders" element={
					<CheckAuth isAuthenticated={isAuthenticated} user={user} >
						<OrdersPageLayout />
					</CheckAuth>
				} >
					<Route path="notifications" element={<Notifications />} />
					<Route path="order-details/:id" element={<OrderDetailsPage />} />
					<Route path="track-package" element={<TrackPackage />} />
					<Route path="product-reviews" element={<ProductReviewPage />} />
					<Route path="seller-profile" element={<SellerProfile />} />
					<Route path="product-exchange" element={<ProductExchange />} />
					<Route path="product-return" element={<ProductReturn />} />
					<Route path="track-return" element={<TrackReturnAndRefund />} />
				</Route>
				<Route path="/admin" element={
					<CheckAuth isAuthenticated={isAuthenticated} user={user} >
						<AdminLayout />
					</CheckAuth>
				}>
					<Route path="dashboard" element={<AdminDashboard/>} />
					<Route path="carousel" element={<AdminCarousel/>} />
					<Route path="products" element={<AdminProducts/>} />
					<Route path="orders" element={<AdminOrders/>} />
					<Route path="reviews" element={<AdminReviews/>} />
					<Route path="event-gallery" element={<EventGallery />} />
					<Route path="sellers" element={<AdminSellers/>} />
					<Route path="newsletter" element={<AdminNewsletter />} />
					<Route path="work-with-us" element={<AdminWorkWithUs />} />
					<Route path="ticket-and-reports" element={<AdminTicketAndReports />} />
					<Route path="request-call" element={<AdminRequestCall />} />
					<Route path="settings" element={<AdminSettings/>} />
				</Route>
			</Routes>
		</div>
	)
}

export default App
