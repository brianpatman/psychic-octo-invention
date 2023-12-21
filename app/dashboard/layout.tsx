export default function Layout({children}: {children: React.ReactNode}){
	return (
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
	);
}
