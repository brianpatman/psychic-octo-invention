'use client';
import { useRef, useState } from "react";
import styles from "./ToDoListItem.module.css";
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

export default function ToDoListItem({ id,name,showCompleted,ToDos,setToDos,setAriaLive }:{id:any,name:string,showCompleted:boolean,ToDos:Array<any>,setToDos:any,setAriaLive:any}){
	const [editable,setEditable] = useState(false);
	const [checked,setCheck] = useState(false);
	const [itemName,setName] = useState( name );
	const dragItem = useRef();
	const dragOverItem = useRef();

	function handleCheck(){
		setCheck(checked => !checked);

		if(checked){
			setAriaLive(`Unchecked item ${itemName}`);
		}
		else{
			setAriaLive(`Checked item ${itemName}`);
		}
	}

	function editItem(){
		setEditable(editable => !editable);
	}

	function deleteItem(){
		setToDos( ToDos.filter( (listItem) => listItem.id !== id) );
		setAriaLive(`Deleted item ${itemName}.`);
	}

	if( !checked || (checked && showCompleted)){
		return <> 
				<div className="flex gap-24 items-center justify-between border-y border-white py-2 px-3">
					{ editable ? (
						<>
							<label>
								<input type="text" className={styles['edit-name']} onChange={(event) => setName(event.target.value) value={itemName} />
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
