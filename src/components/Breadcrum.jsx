

function Breadcrumb({ items }) {
	return (
		<nav className="flex items-center space-x-1 text-sm font-medium">
			{items.map((item, index) => (
				<div key={index} className="flex items-center">
					{index > 0 && (
						<i className="fi fi-br-angle-small-right relative top-[2px] mr-1"></i>
					)}
					{index === items.length - 1 ? (
						<span className="text-[rgb(253,84,120)]">{item}</span>
					) : (
						<span>{item}</span>
					)}
				</div>
			))}
		</nav>
	);
}

export default Breadcrumb;
