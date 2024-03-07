'use client';
import { useState } from "react";

function Item({name, inEditMode} : {name:string,inEditMode:boolean}){
	const [itemName,setName] = useState( name );

	if(inEditMode){
		return <>
			<input type="text" className="edit-name text-black" onChange={(event) => setName(event.target.value)} value={itemName} />
		</>;
	}
	else{
		return <>
			<input className="mr-1.5" type="checkbox" />
			<span className="itemName">{itemName}</span>
		</>
	}
}

export default function ToDoListItem({ name } : {name:string}){
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
		<div className="flex gap-24 items-center justify-between border-y border-white py-2 px-3">
			<label className={checked ? "line-through" : "" }>
				{ editable ? (
					<>
						<input type="text" className="edit-name text-black" onChange={(event) => setName(event.target.value)} value={itemName} />
					</>
				) : (
					<>
						<input className="mr-1.5" type="checkbox" onChange={handleCheck} />
						<span className="itemName">{itemName}</span>
					</>
				)}
				<Item name={name} inEditMode={editable} />
			</label>
			<button onClick={editItem}>
				{ editable ? "Save Item" : "Edit Item"}
			</button>
		</div>
	</>;
}
