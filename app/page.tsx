import "@/app/globals.css";
import { useState } from 'react';

export default function Page(){

	return <>
		<h1 className="text-sky-400 uppercase text-lg mb-4">Dashboard</h1>

		<h2 className="mt-10">React Apps to Make</h2>
		<ul className="list-disc list-inside">
			<li className="line-through">ToDo List</li>
			<li>Weather App</li>
			<li>Emoji Search</li>
			<li>Quiz</li>
			<li>BMI Calculator</li>
			<li>Calculator</li>
			<li>Ecommerce Product Page</li>
		</ul>
	</>;
}
