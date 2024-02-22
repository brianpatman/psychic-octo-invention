'use client'
import "@/app/globals.css";
import { useState } from 'react';

export default function Page(){
	// const [total,setTotal] = useState(0);
	// const [numbers,setNumbers] = useState({num1:0,num2:0});
	const [number1,setNum1] = useState(0);
	const [number2,setNum2] = useState(0);
	const total = number1 + number2;

	return <>
		<h1 className="text-sky-400 uppercase text-lg">Dashboard Page</h1>
		<label>
			First Number
			<input 
				id="first-num" 
				type="number"
				className="text-black p-10 rounded-md" 
				name="first_number"
				value={number1}
				onChange={(event) => setNum1( parseInt(event.target.value))}
			/>
		</label>

		<label>
			Second Number
			<input 
				id="second-num" 
				type="number"
				className="text-black p-10 rounded-md" 
				name="second_number"
				value={number2} 
				onChange={(event) => setNum2( parseInt(event.target.value))}
			/>
		</label>

		<button>
			Click Me
		</button>

		<div className="result">
			<h2>{total}</h2>
		</div>
	</>;
}
