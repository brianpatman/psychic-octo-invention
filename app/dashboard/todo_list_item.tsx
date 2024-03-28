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

	let API_DATA = [
		{id:"1", name:"Laundry"},
		{id:"2", name:"Grocieries"},
		{id:"3", name:"Federal Tax Return"}
	];

	const [itemData,setItemData] = useState(API_DATA);
	const [showCompleted,toggleCompleted] = useState(true);
	let newItemName = useRef("");

	function handleNewItemName(value:string){
		// newItemName.current = event.target.value;
		newItemName.current = value;
	}

	function handleAddItem(event:React.FormEvent<HTMLFormElement>){
		event.preventDefault();

		newItemName.current = "";

		setItemData([
			...itemData,
			{id:crypto.randomUUID(),name:newItemName.current}
		]);
	}

	function deleteItem(){
		console.log("Item Deleted");
	}

	function showHideCompleted(){
		toggleCompleted(showCompleted => !showCompleted);
	}

	return <>
		<div className="controls">
			<label>			
				<input className="mr-1.5" type="checkbox" onChange={showHideCompleted} />
				Show Completed Items
			</label>
		</div>

		{ 
			itemData.map( item =>
				<ToDoListItem key={item.id} name={item.name} showCompleted={showCompleted}/>
			) 
		}
		{/*{children}*/}
		<form className="add-item-dialog" onSubmit={(event) => handleAddItem(event)}>
			<input className="text-black p-1" type="text" name="itemname" onChange={(event) => handleNewItemName(event.target.value)}/>
			<button>Add Item</button>
		</form>
	</>;
}

// function ToDoListItem({name:string, deleteFunc:function}){
// function ToDoListItem({ name } : {name:string}){
function ToDoListItem({name:string, showCompleted:bool}){
	const [editable,setEditable] = useState(false);
	const [checked,setCheck] = useState(false);
	const [itemName,setName] = useState( name );

	function handleCheck(){
		setCheck(checked => !checked);
	}

	function editItem(){
		setEditable(editable => !editable);
	}

	if(!showCompleted || !checked){
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

}
