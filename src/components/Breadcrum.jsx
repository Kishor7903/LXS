import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


function Breadcrum({ items }) {
	let lastItem = items.pop();
	return (
		<Breadcrumb>
			<BreadcrumbList>
				{
					items.map((item, index) => (
							<BreadcrumbItem key={index}>
								<BreadcrumbLink className="text-blue-500 lg:hover:underline" href={item.path}>{item.label}</BreadcrumbLink>
								<BreadcrumbSeparator />
							</BreadcrumbItem>
					))
				}
				<BreadcrumbItem>
					<BreadcrumbPage className="text-[rgb(240,85,120)]" >{lastItem.label}</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>

	)
}

export default Breadcrum
