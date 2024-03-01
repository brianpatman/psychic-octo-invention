'use client';
import { useState } from "react";

export default function ToDoListItem(){
	const [checked,setCheck] = useState(false);

	function handleCheck(ev){
		setCheck(checked => !checked);
	}
	
	return <> 
		<label className={ checked ? "line-through" : "" }>
			<input type="checkbox" onChange={handleCheck} />
			Laundry
		</label>
	</>;
}
