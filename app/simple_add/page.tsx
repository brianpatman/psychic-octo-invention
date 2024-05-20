'use client'
import "@/app/globals.css";
import { useState } from 'react';

export default function Page(){
	const [number1,setNum1] = useState(0);
	const [number2,setNum2] = useState(0);
	const total = number1 + number2;

	return <>
		<h1 className="text-sky-400 uppercase text-lg mb-4">Simple Addition</h1>
		<label className="flex items-center gap-5 mb-3">
			First Number
			<input 
				id="first-num" 
				type="number"
				className="text-black p-2 rounded-md" 
				name="first_number"
				value={number1}
				onChange={(event) => setNum1( parseInt(event.target.value))}
			/>
		</label>

		<label className="flex items-center gap-5 mb-3">
			Second Number
			<input 
				id="second-num" 
				type="number"
				className="text-black p-2 rounded-md" 
				name="second_number"
				value={number2} 
				onChange={(event) => setNum2( parseInt(event.target.value))}
			/>
		</label>

		{ !isNaN(total) ? (
			<div className="result">
				<h2>{total}</h2>
			</div>
		):(
			<div className="result">
				<h2>No Result</h2>
			</div>
		)}
	</>;
}
