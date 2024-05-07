'use client';
import { useRef, useState } from "react";
import { TrashIcon, EditIcon, SaveIcon } from "@/app/ui/icons";

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
		<form 
			className="add-item-dialog my-5" 
			ref={formRef}
			onSubmit={(event) => handleAddItem(event)}
		>
			<input className="text-black p-1 mr-2.5 rounded" type="text" name="itemname" onChange={(event) => handleNewItemName(event.target.value)} />
			<button className="rounded bg-blue-600 px-4 py-3">Add Item</button>
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
