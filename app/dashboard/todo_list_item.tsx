'use client';
import { useState } from "react";

export default function ToDoListItem(){
	const [checked,setCheck] = useState(false);

	function handleCheck(ev){
		setCheck(!checked);
	}
	
	return <> 
		<label className={{ checked ? "line-through" : "" }}>
			<input type="checkbox" onChange={this.handleCheck} />
			Laundry
		</label>
	</>;
}
