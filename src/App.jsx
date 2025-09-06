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
import ShopSettingSubscriptions from "./pages/shop/ShopSettingSubscriptions"
import ShopSettingSettings from "./pages/shop/ShopSettingSettings"
import ShopSettingContactUs from "./pages/shop/ShopSettingContactUs"
import OrdersPageLayout from "./layouts/OrdersPageLayout"
import OrderDetailsPage from "./pages/shop/OrderDetailsPage"
import TrackPackage from "./pages/shop/TrackPackage"
import ProductReviewPage from "./pages/shop/ProductReviewPage"
import CheckoutLayout from "./layouts/CheckoutLayout"
import Notification from "./pages/shop/Notification"
import AccountPreference from "./pages/shop/AccountPreference"
import SecurityLogin from "./pages/shop/SecurityLogin"
import PrivacyData from "./pages/shop/PrivacyData"
import SellerProfile from "./pages/shop/SellerProfile"
import ProductExchange from "./pages/shop/ExchangeProduct"
import ProductReturn from "./pages/shop/ProductReturn"
import Notifications from "./pages/shop/Notifications"
import ShopSettingMyRatingsAndReviews from "./pages/shop/ShopSettingMyRatingsAndReviews"
import TrackReturnAndRefund from "./pages/shop/TrackReturnAndRefund"
import AllBlogs from "./pages/shop/AllBlogs"
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
import EventGallery from "./pages/admin/EventGallery"
import ProductsPageLayout from "./layouts/ProductsPageLayout"
import BlogPageLayout from "./layouts/BlogPageLayout"
import AboutUsPageLayout from "./layouts/AboutUsPageLayout"
import PersonalizedOrderPageLayout from "./layouts/PersonalizedOrderPageLayout"
import BulkOrderPageLayout from "./layouts/BulkOrderPageLayout"
import RecentViewedProducts from "./pages/shop/RecentViewedProducts"
import UserLayout from "./layouts/UserLayout"
import Subscription from "./pages/shop/Subscription"
import PartnerWithUs from "./pages/shop/PartnerWithUs"
import CartPageLayout from "./layouts/CartPageLayout"
import AdminPromotionalBanners from "./pages/admin/AdminPromotionalBanners"
import AdminPickupWarehouse from "./pages/admin/AdminPickupWarehouse"
import SuccessfulPopup from "./components/SuccessfulPopup"
import AddressPageLayout from "./layouts/AddressPageLayout"
import HiddenOrders from "./pages/shop/HiddenOrders"
import GlobalLoader from "./components/GlobalLoader"
import PaymentPageLayout from "./layouts/PaymentPageLayout"
import Blog from "./pages/shop/Blog"
import AdminBlogs from "./pages/admin/AdminBlogs"
import ReturnedAndCancelled from "./pages/shop/ReturnedAndCancelled"
import BlankPage from "./components/BlankPage"
import loader from "./assets/GIF/Page Reload Animation 2.gif"
import { getUserInfo } from "./firebase/auth"
import TrackOrders from "./pages/shop/TrackOrders"
import PaymentHistory from "./pages/shop/PaymentHistory"
import CustomOrders from "./pages/shop/CustomOrders"
import CookieAndTrackingPolicy from "./pages/shop/CookieAndTrackingPolicy"
import AgeAndEligibilityPolicy from "./pages/shop/AgeAndEligibilityPolicy"
import ThirdPartyServiceProviderPolicy from "./pages/shop/ThirdPartyServiceProviderPolicy"
import LimitationOfLiabilityAndDisclaimerPolicy from "./pages/shop/LimitationOfLiabilityAndDisclaimerPolicy"
import AdminUsers from "./pages/admin/AdminUsers"

function App() {
	let { isAuthenticated, user } = useSelector(state => state.auth);
	// const [loading, setLoading] = useState(() => {
	// 	const isShown = sessionStorage.getItem("appLoaderShown");
	// 	return !isShown;
	// });
	let [loading, setLoading] = useState(true);
	let dispatch = useDispatch();

	useEffect(() => {
		async function fetchData(){
			let user = JSON.parse(sessionStorage.getItem("user"));
			if (user) {
				await getUserInfo(user.id).then((res) => {
					dispatch(login(res))
				})
			}
			setLoading(false)
		}
		fetchData();
	}, [dispatch])

	// useEffect(() => {
	// 	listenForMessages(toast);
	// }, [])

	if(loading){
		return <div className="h-screen flex justify-center items-center">
			<img src={loader} alt="" className="h-60" />
		</div>
	}

	return (
		<div className="h-screen w-full overflow-y-scroll scrollable-content relative">
			{/* {
				loading && <GlobalLoader onFinish={() => setLoading(false)} />
			} */}
			<ScrollToTop />
			<Routes>
				<Route path="/" element={
					<CheckAuth isAuthenticated={isAuthenticated} user={user} >
						<ShopLayout />
					</CheckAuth>
				} >
					<Route path="shop" element={<HomePageLayout />} />
					<Route path="products" element={<ProductsPageLayout />} />
					<Route path="product-details/:id" element={<ProductDetailsPageLayout />} />
					<Route path="blogs" element={<BlogPageLayout />} />
					<Route path="about-us" element={<AboutUsPageLayout />} />
					<Route path="all-blogs" element={<AllBlogs />} />
					<Route path="blog/:id" element={<Blog />} />
					<Route path="bulk-order" element={<BulkOrderPageLayout />} />
					<Route path="personalized-order" element={<PersonalizedOrderPageLayout />} />
					<Route path="subscription" element={<Subscription />} />
					<Route path="/partner-with-us" element={<PartnerWithUs />} />
					<Route path="/blank" element={<BlankPage />} />
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
					<Route path="cookie-and-tracking-policy" element={<CookieAndTrackingPolicy />} />
					<Route path="age-and-eligibility-policy" element={<AgeAndEligibilityPolicy />} />
					<Route path="third-party-service-provider-policy" element={<ThirdPartyServiceProviderPolicy />} />
					<Route path="limitation-of-liability-and-disclaimer-policy" element={<LimitationOfLiabilityAndDisclaimerPolicy />} />
				</Route>
				<Route path="/checkout" element={
					<CheckAuth isAuthenticated={isAuthenticated} user={user} >
						<CheckoutLayout />
					</CheckAuth>
				} >
					<Route path="cart" element={<CartPageLayout />} />
					<Route path="address" element={<AddressPageLayout />} />
					<Route path="payment" element={<PaymentPageLayout />} />
				</Route>
				<Route path="/user" element={
					<CheckAuth isAuthenticated={isAuthenticated} user={user} >
						<UserLayout />
					</CheckAuth>
				} >
					
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
					{/* <Route path="payment-options" element={<ShopSettingPaymentOptions />} /> */}
					{/* <Route path="subscriptions" element={<ShopSettingSubscriptions />} /> */}
					<Route path="my-ratings-reviews" element={<ShopSettingMyRatingsAndReviews />} />
					<Route path="notification" element={<Notification />} />
					<Route path="account-preference" element={<AccountPreference />} />
					<Route path="security-login" element={<SecurityLogin />} />
					<Route path="privacy-data" element={<PrivacyData />} />
					<Route path="hidden-orders" element={<HiddenOrders />} />
					{/* <Route path="settings" element={<ShopSettingSettings />} >
					</Route> */}
					<Route path="contact-us" element={<ShopSettingContactUs />} />
				</Route>
				<Route path="/orders" element={
					<CheckAuth isAuthenticated={isAuthenticated} user={user} >
						<OrdersPageLayout />
					</CheckAuth>
				} >
					<Route path="order-details/:id" element={<OrderDetailsPage />} />
					<Route path="track-package/:id" element={<TrackPackage />} />
					<Route path="product-reviews/:orderId/:productId" element={<ProductReviewPage />} />
					<Route path="seller-profile/:id" element={<SellerProfile />} />
					<Route path="product-exchange/:id" element={<ProductExchange />} />
					<Route path="product-return/:id" element={<ProductReturn />} />
					<Route path="track-return/:id" element={<TrackReturnAndRefund />} />
					<Route path="successfull/:id" element={<SuccessfulPopup />} />
					<Route path="payment-history" element={<PaymentHistory />} />
					<Route path="notifications" element={<Notifications />} />
					<Route path="returned-and-cancelled-orders" element={<ReturnedAndCancelled />} />
					<Route path="track-orders" element={<TrackOrders />} />
					<Route path="custom-orders" element={<CustomOrders />} />
					<Route path="recent-viewed-products" element={<RecentViewedProducts />} />
				</Route>
				<Route path="/admin" element={
					<CheckAuth isAuthenticated={isAuthenticated} user={user} >
						<AdminLayout />
					</CheckAuth>
				}>
					<Route path="dashboard" element={<AdminDashboard />} />
					{/* <Route path="carousel" element={<AdminCarousel />} />
					<Route path="promotional-banners" element={<AdminPromotionalBanners />} /> */}
					<Route path="products" element={<AdminProducts />} />
					<Route path="users" element={<AdminUsers />} />
					<Route path="pickup-warehouse" element={<AdminPickupWarehouse />} />
					<Route path="orders" element={<AdminOrders />} />
					<Route path="blogs" element={<AdminBlogs />} />
					<Route path="ratings-reviews" element={<AdminReviews />} />
					<Route path="event-gallery" element={<EventGallery />} />
					<Route path="sellers" element={<AdminSellers />} />
					<Route path="newsletter" element={<AdminNewsletter />} />
					<Route path="work-with-us" element={<AdminWorkWithUs />} />
					<Route path="ticket-and-reports" element={<AdminTicketAndReports />} />
					<Route path="request-call" element={<AdminRequestCall />} />
					<Route path="settings" element={<AdminSettings />} />
				</Route>
			</Routes>
		</div>
	)
}

export default App
