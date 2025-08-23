import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const placeholders = ["Products", "Clothing"];

export default function AnimatedInput() {
	const [index, setIndex] = useState(0);
	const [isFocused, setIsFocused] = useState(false);
	const inputRef = useRef(null);
	const [searchText, setSearchText] = useState("");
	let { products } = useSelector(state => state.admin);
	let navigate = useNavigate();
	let location = useLocation().pathname;
	const dropdownRef = useRef(null);

	let words = searchText.toLowerCase().split(/\s+/).filter(Boolean);

	let searchedProducts = [];

	products.forEach((obj) => {
		const productName = obj.name.toLowerCase();
		const sku = obj.SKU?.toLowerCase() || "";

		// check if any word matches product name
		if (words.some(word => productName.includes(word))) {
			searchedProducts.push({ ...obj, matchType: "name" });
		}

		// check if any word matches SKU
		if (words.some(word => sku.includes(word))) {
			searchedProducts.push({ ...obj, matchType: "sku" });
		}
	});

	// ✅ limit results
	searchedProducts = searchedProducts.slice(0, 5);


	const handleBlur = () => {
		setIsFocused(false);
		setSearchText("");   // ✅ clear input
	};

	useEffect(() => {
		function handleClickOutside(event) {
			if (
				inputRef.current &&
				!inputRef.current.contains(event.target) &&
				(!dropdownRef.current || !dropdownRef.current.contains(event.target))
			) {
				handleBlur();   // ✅ clears input & closes dropdown
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	useEffect(() => {
		if (!isFocused) {
			const interval = setInterval(() => {
				setIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
			}, 3000);
			return () => clearInterval(interval);
		}
	}, [isFocused]);

	return (
		<div className="relative w-[700px] hidden sm:block flex-1 ml-10">
			<input
				ref={inputRef}
				onFocus={() => setIsFocused(true)}
				value={searchText}
				autoComplete="off"
				onChange={(e) => {
					setSearchText(e.target.value);
				}}
				type="text"
				className={`w-full px-4 h-[34px] focus:outline-none ${searchText && searchedProducts.length > 0 ? "rounded-t-[17px] border-x border-t" : "rounded-xl border border-slate-300"} shadow`}
			/>
			{
				!searchText && !isFocused && (   // ✅ hide animation when focused
					<div className="absolute left-5 top-[6px] text-gray-400 pointer-events-none w-5/6">
						<span
							key={index}
							className="absolute placeholder-transition"
							style={{
								opacity: 0,
								animation: `fadeInOut 3s ease-in-out infinite`,
							}}
						>
							{'"' + placeholders[index] + '"'}
						</span>
					</div>
				)
			}

			<i className="fi fi-rr-search absolute right-3 top-2 text-gray-500"></i>
			{
				searchText && searchedProducts.length > 0 ? (
					<div ref={dropdownRef} onClick={() => setIsFocused(true)} className="w-full rounded-b-[17px] absolute top-[34px] bg-white border border-slate-300 flex flex-col overflow-hidden">
						{searchedProducts.map((item, index) => (
							<div
								key={index + item.matchType}  // to avoid duplicate key
								tabIndex={0}
								className="cursor-pointer hover:bg-gray-100 py-2 flex gap-2 items-center px-4"
								onClick={() => {
									(location.includes("/setting") || location.includes("/orders") || location.includes("/checkout"))
										? navigate(`../product-details/${item.id}`)
										: navigate(`product-details/${item.id}`);

									setSearchText("");
									setIsFocused(false);
								}}
							>
								<img src={item.images[0]} alt="" className="h-8" />
								<div className="flex flex-col">
									{item.matchType === "name" && (
										<span className="line-clamp-1">{item.name}</span>
									)}
									{item.matchType === "sku" && (
										<span className="line-clamp-1 text-gray-600">{item.SKU}</span>
									)}
								</div>
							</div>
						))}

					</div>
				)
					:
					null
			}
		</div>
	);
}
