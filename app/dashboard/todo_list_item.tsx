'use client';
import { useState } from "react";

export default function ToDoListItem({ name:string }){
	const [checked,setCheck] = useState(false);
	const [editable,setEditable] = useState(false);
	const [itemName,setName] = useState( name );

	function handleCheck(){
		setCheck(checked => !checked);
	}

	function editItem(){
		setEditable(editable => !editable);
	}

	return <> 
		<div className="flex gap-24 items-center justify-between block border-y border-white py-2 px-3">
			<label className={checked ? "line-through" : "" }>
				<input className="mr-1.5" type="checkbox" onChange={handleCheck} />

				{ editable ? (
					<input type="text" className="edit-name text-black" onChange={(event) => setName(event.target.value)} value={itemName} />
				) : (
					<span className="itemName">{itemName}</span>
				)}
			</label>
			<button onClick={editItem}>
				{ editable ? "Save Item" : "Edit Item"}
			</button>
		</div>
	</>;
}
