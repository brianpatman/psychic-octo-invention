import "@/app/globals.css";

export default function Page(){
	const [total,setTotal] = useState(0);

	function handleClick(){
		// alert("clicked!");

		var FirstNum = parseInt(document.querySelector("#first-num").value());
		var SecondNum = parseInt(document.querySelector("#second-num").value());

		var newTotal= FirstNum + SecondNum;
		setTotal(newTotal);
	}

	return <>
		<h1 className="text-sky-400 uppercase text-lg">Dashboard Page</h1>
		<label>
			First Number
			<input id="first-num" type="number" name="first_number"/>
		</label>

		<label>
			Second Number
			<input id="second-num" type="number" name="second_number"/>
		</label>

		<button onClick={handleClick}>
			Click Me
		</button>

		<div class="result">
			<h2>{total}</h2>
		</div>
	</>;
}
