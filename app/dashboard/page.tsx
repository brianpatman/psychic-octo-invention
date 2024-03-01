import "@/app/globals.css";
import { useState } from 'react';
import ToDoListItem from "./todo_list_item";

export default function Page(){

	return <>
		<h1 className="text-sky-400 uppercase text-lg mb-4">Dashboard</h1>

		<ToDoListItem/>

		<h2>React Apps to Make</h2>
		<ul className="list-disc list-inside">
			<li>ToDo List</li>
			<li>Weather App</li>
			<li>Emoji Search</li>
			<li>Quiz</li>
			<li>BMI Calculator</li>
			<li>Calculator</li>
			<li>Ecommerce Product Page</li>
		</ul>
	</>;
}
