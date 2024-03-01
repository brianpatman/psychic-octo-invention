'use client'
import "@/app/globals.css";
import { useState } from 'react';

export default function Page(){
	// const [number1,setNum1] = useState(0);
	// const [number2,setNum2] = useState(0);

	const [numbers,setNumbers] = useState({
		firstNum: 0,
		secondNum: 0
	});
	// const total = number1 + number2;
	const total = numbers.firstNum + numbers.secondNum;

	return <>
		<h1 className="text-sky-400 uppercase text-lg mb-4">Dashboard</h1>
		<h2>React Apps to Make</h2>
		<ul>
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
