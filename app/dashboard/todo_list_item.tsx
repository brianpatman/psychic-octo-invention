'use client';
import { useState } from "react";

export default function ToDoListItem(){
	const [checked,setCheck] = useState(false);
	const [editable,setEditable] = useState(false);
	const [itemName,setName] = useState("Laundry");

	function handleCheck(){
		setCheck(checked => !checked);
	}

	function editItem(){
		setEditable(editable => !editable);
	}


	return <> 
			<label className={`block border-y border-white py-2 px-3 ${checked ? "line-through" : "" }`}>
				<input className="mr-1.5" type="checkbox" onChange={handleCheck} />

				{ editable ? (
					<input type="text" className="edit-name color-black" onChange={(event) => setName(event.target.value)} value={itemName} />
				) : (
					<span className="itemName">{itemName}</span>
				)}
			</label>
			<button onClick={editItem}>
				{ editable ? "Save Item" : "Edit Item"}
			</button>
	</>;
}
