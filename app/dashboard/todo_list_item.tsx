'use client';
import { useRef, useState } from "react";
import { TrashIcon, EditIcon, SaveIcon } from "@/app/ui/icons.tsx"

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
		{id:"2", name:"Groceries"},
		{id:"3", name:"Federal Tax Return"}
	];

	const [itemData,setItemData] = useState(API_DATA);
	const [showCompleted,toggleCompleted] = useState(false);
	let newItemName = useRef("");
	const formRef = useRef<HTMLFormElement>(null);

	function handleNewItemName(value:string){
		newItemName.current = value;
	}

	// function handleAddItem(){
	function handleAddItem(event:React.FormEvent<HTMLFormElement>){
		event.preventDefault();

		if(formRef.current !== null){
			formRef.current.reset();	
		}

		if(newItemName.current == ""){
			return false;
		}

		setItemData([
			...itemData,
			{id:crypto.randomUUID(),name:newItemName.current}
		]);
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
				<ToDoListItem 
					key={item.id} 
					id={item.id}
					name={item.name} 
					showCompleted={showCompleted} 
					ToDos={itemData} 
					setToDos={setItemData}/>
			)
		}
		{/*{children}*/}
		<form 
			className="add-item-dialog" 
			ref={formRef}
			onSubmit={(event) => handleAddItem(event)}
		>
			<input className="text-black p-1" type="text" name="itemname" onChange={(event) => handleNewItemName(event.target.value)} />
			<button>Add Item</button>
		</form>
	</>;
}

function ToDoListItem({ id,name,showCompleted,ToDos,setToDos }:{id:any,name:string,showCompleted:boolean,ToDos:Array<any>,setToDos:any}){
	const [editable,setEditable] = useState(false);
	const [checked,setCheck] = useState(false);
	const [itemName,setName] = useState( name );

	function handleCheck(){
		setCheck(checked => !checked);
	}

	function editItem(){
		setEditable(editable => !editable);
	}

	function deleteItem(){
		setToDos( ToDos.filter( (listItem) => listItem.id !== id) );
	}

	if( !checked || (checked && showCompleted)){
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
								<input className="mr-1.5" type="checkbox" onChange={handleCheck} checked={checked} />
								<span className="itemName">{itemName}</span>
							</label>
						</>
					)}

					<div className="buttons">
						<button onClick={editItem}>
							{/*{ editable ? "Save Item" : "Edit Item"}*/}
							{ editable ? <SaveIcon></SaveIcon> : <EditIcon></EditIcon> }
						</button>

						<button className="delete-item-btn" onClick={deleteItem}>
							<TrashIcon></TrashIcon>
						</button>
					</div>
				</div>
		</>;
	}

}

// function TrashIcon(){
// 	return <>
// 		<svg className="fill-white h-6 w-6 mx-1.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
// 			<path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
// 		</svg>
// 	</>;
// }

// function EditIcon(){
// 	return <>
// 		<svg className="fill-white h-6 w-6 mx-1.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
// 			<path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/>
// 		</svg>
// 	</>;
// }

// function SaveIcon(){
// 	return <>
// 		<svg className="fill-white h-6 w-6 mx-1.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
// 			<path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32H64zm0 96c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
// 		</svg>
// 	</>;
// }
