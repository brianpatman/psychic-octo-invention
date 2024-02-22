'use client'
import "@/app/globals.css";
import { useState } from 'react';

export default function Page(){
	const [numbers,setNumbers] = useState({num1:0,num2:0});
	const total = numbers.num1 + numbers.num2;

	function setFirstNum(e: React.FormEvent<HTMLInputElement>){
		setNumbers({
			num1: e.target.value(),
			num2: numbers.num2
		});
	}

	function setSecondNum(e: React.FormEvent<HTMLInputElement>){
		setNumbers({
			num1: numbers.num1,
			num2: e.target.value()
		});
	}

	return <>
		<h1 className="text-sky-400 uppercase text-lg">Dashboard Page</h1>
		<label>
			First Number
			<input id="first-num" type="number" name="first_number" onChange={setFirstNum}/>
		</label>

		<label>
			Second Number
			<input id="second-num" type="number" name="second_number" onChange={setSecondNum}/>
		</label>

		<button>
			Click Me
		</button>

		<div class="result">
			<h2>{total}</h2>
		</div>
	</>;
}
