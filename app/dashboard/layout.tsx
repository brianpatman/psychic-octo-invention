import Link from "next/link";
import { roboto } from "@/app/ui/fonts";
import "@/app/globals.css";

const links = [
	{id:"1", name:"Home", href:"/dashboard"},
	{id:"2", name:"Simple Addition", href:"/dashboard/simple_add"},
	{id:"3", name:"Simple Add w/ Single State", href:"/dashboard/simple_add_single_state"}
]

export default function Layout({children}: {children: React.ReactNode}){
	return (
		<div className="flex flex-col md:flex-row md:overflow-hidden">
			<div className="w-full flex-none md:w-48 height-screen bg-teal-700">
				<div className="sidenav">
					<nav>
						<ul>
							{
								links.map(link => 
									<li key={link.id} className="block border-b-1 border-white block p-5 bg-teal-500">
										<Link
											href={link.href} 
											className={`${roboto.className} text-white hover:bg-teal-700`}>
											{link.name}	
										</Link>
									</li>
								)
							}
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
