'use client';
import { useRef, useState } from "react";

// function checklistItem({name, inEditMode} : {name:string,inEditMode:boolean}){
// 	const [checked,setCheck] = useState(false);
// 	const [itemName,setName] = useState( name );

// 	function handleCheck(){
// 		setCheck(checked => !checked);
// 	}

// 	if(inEditMode){
// 		return <>
// 			<label>
// 				<input type="text" className="edit-name text-black" onChange={(event) => setName(event.target.value)} value={itemName} />
// 				<span className="sr-only">Edit field</span>
// 			</label>
// 		</>;
// 	}
// 	else{
// 		return <>
// 			<label className={checked ? "line-through" : "" }>
// 				<input className="mr-1.5" type="checkbox" onChange={handleCheck} />
// 				<span className="itemName">{itemName}</span>
// 			</label>
// 		</>
// 	}
// }

export default function ToDoList(){

	// let API_DATA = [
	// 	{id:"1", name:"Laundry"},
	// 	{id:"2", name:"Grocieries"},
	// 	{id:"3", name:"Federal Tax Return"}
	// ];

	const [itemData,setItemData] = useState([
		{id:"1", name:"Laundry"},
		{id:"2", name:"Grocieries"},
		{id:"3", name:"Federal Tax Return"}
	]);
	// let newItemName = useRef<HTMLFormElement>(null);
	let newItemName = useRef("");

	// function addItem(event: React.FormEvent<HTMLFormElement>){
	// 	event.preventDefault();
		// newItemName.current = event.currentTarget.elements.namedItem("itemname").value;

		// if(!event){
		// 	return;
		// }
		// if(!event.currentTarget){
		// 	return;
		// }
		// if(!event.currentTarget.elements){
		// 	return;
		// }
		// if(!event.currentTarget.elements.namedItem("itemname")){
		// 	return;
		// }
		// if(!event.currentTarget.elements.namedItem("itemname").value){
		// 	return;
		// }

		// console.log(event.currentTarget.elements.namedItem("itemname").value);

		// const itemName = event.target;
		// const formData = new FormData(event.currentTarget);

		// setItemData([
		// 	...itemData,
		// 	{id:crypto.randomUUID(), name:itemName}
		// ]);
	// }

	function handleNewItemName(value:string){
		// newItemName.current = event.target.value;
		newItemName.current = value
	}

	function handleSubmit(){
		event.preventDefault();
		setItemData([
			...itemData,
			{id:crypto.randomUUID(),name:newItemName.current}
		]);
	}

	return <>
		{ 
			itemData.map( item =>
				<ToDoListItem key={item.id} name={item.name}/>
			) 
		}
		{/*{children}*/}
		<form className="add-item-dialog" onSubmit={(event) => handleSubmit}>
			<input className="text-black" type="text" name="itemname" onChange={(event) => handleNewItemName(event.target.value)}/>
			<button>Add Item</button>
		</form>
	</>;
}

function ToDoListItem({ name } : {name:string}){
	const [editable,setEditable] = useState(false);
	const [checked,setCheck] = useState(false);
	const [itemName,setName] = useState( name );

	function handleCheck(){
		setCheck(checked => !checked);
	}

	function editItem(){
		setEditable(editable => !editable);
	}

	return <> 
		<div className="flex gap-24 items-center justify-between border-y border-white py-2 px-3">
			{ editable ? (
				<>
					<label>
						<input type="text" className="edit-name text-black" onChange={(event) => setName(event.target.value)} value={itemName} />
						<span className="sr-only">Edit {itemName} field</span>
					</label>
				</>
			) : (
				<>
					<label className={checked ? "line-through" : "" }>
						<input className="mr-1.5" type="checkbox" onChange={handleCheck} />
						<span className="itemName">{itemName}</span>
					</label>
				</>
			)}
			{/*<checklistItem name={name} inEditMode={editable} />*/}
			<button onClick={editItem}>
				{ editable ? "Save Item" : "Edit Item"}
			</button>
		</div>
	</>;
}
