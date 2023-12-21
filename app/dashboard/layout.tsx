import Link from "next/link";

const links = [
	{name:"Home", href:"/dashboard"},
	{name:"Invoices", href:"/dashboard/invoices"},
	{name:"Customers", href:"/dashboard/customers"},
]

export default function Layout({children}: {children: React.ReactNode}){
	return (
		<>
			<div className="flex flex-col md:flex-row md:overflow-hidden">
				<div classNane="w-full flex-none md:w-64">
					<div className="sidenav">
						<nav>
							<ul>
								{
								links.map((link) => {
									return (
										<li>
											<Link
												key={link.name} 
												href={link.href} 
												className="">
												<p>{link.name}</p>		
											</Link>
										</li>
									)
								})
								}
							</ul>
						</nav>
					</div>
				</div>

				<div className="flex-grow p-6 md:overflow-y-auto md:p-12">
					{children}
				</div>
			</div>
		</>
	);
}
