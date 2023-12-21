export default function Layout({children}: {children: React.ReactNode}){
	return (
		<div className="flex flex-col md:flex-row md:overflow-hidden">
			<div classNane="w-full flex-none md:w-64">
				<div className="sidenav">
					<nav>
						<ul>
						    <li className="rounded-sm bg-emerald-300 mb-2">
						    	<a href="">Home</a>
						    </li>
							
							<li className="rounded-sm bg-emerald-300 mb-2">
								<a href="">Invoices</a>
							</li>

							<li className="rounded-sm bg-emerald-300 mb-2">
								<a href="">Customers</a>
							</li>
						</ul>
					</nav>
				</div>
			</div>

			<div className="flex-grow p-6 md:overflow-y-auto md:p-12">
				{children}
			</div>
		</div>

	);
}
