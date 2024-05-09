'use client';
import { useRef, useState } from "react";
import { TrashIcon, EditIcon, SaveIcon } from "@/app/ui/icons";

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
	const formRef = useRef<HTMLFormElement>(null);

	function handleAddItem(event:React.FormEvent<HTMLFormElement>){
		event.preventDefault();

		let form = formRef.current;
		let itemName = "";

		if(form === null){
			return false;
		}

		itemName = form["itemname"].value;

		if(itemName == ""){
			return false;
		}

		form.reset();

		setItemData([
			...itemData,
			{ id: crypto.randomUUID(), name: itemName }
		]);
	}

	function showHideCompleted(){
		toggleCompleted(showCompleted => !showCompleted);
	}

	const dragItem = useRef<any>();
	const dragOverItem = useRef<any>();

	function dragStart(e:React.FormEvent<HTMLFormElement>){
		console.log(e);
		// dragItem.current = e.target;
	}

	function dragEnter(e:React.FormEvent<HTMLFormElement>){
		console.log(e);
		// dragOverItem.current = e.currentTarget;
	}

	function dropItem(){
		const listItems = [...itemData];
		const dragItemContent = listItems[dragItem.current];

		let dragItemIndex = 0;
		let dragOverItemIndex = 0;

		listItems.forEach(item => {
			if(item.id == dragItem.current){
				dragItemIndex = index;
			}

			if(item.id == dragOverItem.current){
				dragOverItemIndex = index;
			}
		});

		listItems.splice(dragItemIndex,1);
		listItems.splice(dragOverItemIndex,0,dragItemContent)

		dragItem.current = null
		dragOverItem.current = null
		setItemData(listItems);
	}

	return <>
		<div className="controls rounded bg-blue-400 px-2 py-3 mb-2 border border-blue-600">
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
					setToDos={setItemData}
					onDragStart={(e) => dragStart(e)}
					onDragEnter={(e) => dragEnter(e)}
					onDragEnd={dropItem}
					draggable 
				/>
			)
		}
		<form 
			className="add-item-dialog my-5" 
			ref={formRef}
			onSubmit={(event) => handleAddItem(event)}
		>
			<input className="text-black p-2 mr-2.5 rounded" type="text" name="itemname" />
			<button className="rounded bg-blue-600 px-4 py-2">Add Item</button>
		</form>
	</>;
}

function ToDoListItem({ id,name,showCompleted,ToDos,setToDos }:{id:any,name:string,showCompleted:boolean,ToDos:Array<any>,setToDos:any}){
	const [editable,setEditable] = useState(false);
	const [checked,setCheck] = useState(false);
	const [itemName,setName] = useState( name );
	const dragItem = useRef();
	const dragOverItem = useRef();

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
								<input type="text" className="edit-name rounded p-2 text-black" onChange={(event) => setName(event.target.value)} value={itemName} />
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
