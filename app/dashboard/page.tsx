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
			<input id="first-num" type="number" name="first_number" onChange={setNum1}/>
		</label>

		<label>
			Second Number
			<input id="second-num" type="number" name="second_number" onChange={setNum2}/>
		</label>

		<button>
			Click Me
		</button>

		<div class="result">
			<h2>{total}</h2>
		</div>
	</>;
}
