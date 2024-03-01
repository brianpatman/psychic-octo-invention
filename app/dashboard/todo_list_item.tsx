'use client';
import { useState } from "react";

export default function ToDoListItem(){
	const [checked,setCheck] = useState(false);

	function handleCheck(){
		setCheck(checked => !checked);
	}
	
	return <> 
		<div>
			<label className={ checked ? "line-through" : "" }>
				<input className="mr-1.5" type="checkbox" onChange={handleCheck} />
				Laundry
			</label>			
		</div>
	</>;
}
