import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const placeholders = ["Products", "Jobs", "Company", "Art Works", "Artists", "Creators"];

export default function AnimatedInput() {
	const [index, setIndex] = useState(0);
	const [isFocused, setIsFocused] = useState(false);
	const inputRef = useRef(null);
	const [searchText, setSearchText] = useState("");
	let { products } = useSelector(state => state.admin);
	let navigate = useNavigate();
	let location = useLocation().pathname;
	const dropdownRef = useRef(null);

	let searchedProducts = products.filter((obj) => obj.name.toLowerCase().includes(searchText.toLowerCase())).slice(0,5);

	const handleBlur = () => {
		setIsFocused(false);
		setSearchText("");
	};

	useEffect(() => {
		function handleClickOutside(event) {
			if (
				inputRef.current &&
				!inputRef.current.contains(event.target) &&
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target)
			) {
				handleBlur();
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
				className={`w-full px-4 h-[34px] border-slate-400 focus:outline-none ${searchText && searchedProducts.length > 0 ? "rounded-t-[17px] border-x border-t" : "rounded-full border"}`}
			/>
			{
				!isFocused && (
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
					<div ref={dropdownRef} onClick={() => setIsFocused(true)} className="w-full rounded-b-[17px] absolute top-[34px] bg-white border border-slate-400 flex flex-col overflow-hidden">
						{
							searchedProducts.map((item, index) => (
								<div
									key={index}
									tabIndex={0}
									className="cursor-pointer hover:bg-gray-100 py-2 line-clamp-1 flex gap-2 items-center px-4"
									onClick={() => {(location.includes("/setting") || location.includes("/orders") || location.includes("/checkout")) ? navigate(`../product-details/${item.id}`) : navigate(`product-details/${item.id}`)
										setSearchText("");
										setIsFocused(false);
										setTimeout(() => setIsFocused(false), 0);
									}}
								>
									<img src={item.images[0]} alt="" className="h-8" />
									<span className="line-clamp-1">{item.name}</span>
								</div>
							))
						}
					</div>
				)
					:
					null
			}
		</div>
	);
}
