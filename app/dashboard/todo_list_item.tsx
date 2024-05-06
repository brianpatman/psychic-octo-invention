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
		{id:"2", name:"Groceries"},
		{id:"3", name:"Federal Tax Return"}
	];

	const [itemData,setItemData] = useState(API_DATA);
	const [showCompleted,toggleCompleted] = useState(false);
	let newItemName = useRef("");
	const formRef = useRef(null);

	function handleNewItemName(value:string){
		newItemName.current = value;
	}

	function handleAddItem(event:React.FormEvent<HTMLFormElement>){
		event.preventDefault();
		formRef.reset();

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
		console.log(`deleting ${itemName}`);
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
					{/*<checklistItem name={name} inEditMode={editable} />*/}
					<button onClick={editItem}>
						{ editable ? "Save Item" : "Edit Item"}
					</button>

					<button className="delete-item-btn" onClick={deleteItem}>Delete Item</button>
				</div>
		</>;
	}

}
