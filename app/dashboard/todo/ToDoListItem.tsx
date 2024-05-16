'use client';
import { useState } from "react";
import styles from "./ToDoListItem.module.css";
import { TrashIcon, EditIcon, SaveIcon } from "@/app/ui/icons";

export default function ToDoListItem({ id,name,showCompleted,ToDos,setToDos,setAriaLive }:{id:any,name:string,showCompleted:boolean,ToDos:Array<any>,setToDos:any,setAriaLive:any}){
	const [editable,setEditable] = useState(false);
	const [checked,setCheck] = useState(false);
	const [itemName,setName] = useState( name );

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
				<li className={styles.listItem}>
					{ editable ? (
						<>
							<label>
								<input 
									type="text" 
									className={styles.editName} 
									onChange={(event) => setName(event.target.value)} 
									value={itemName} 
								/>
								<span className="sr-only">Edit {itemName} field</span>
							</label>
						</>
					) : (
						<>
							<label className={checked ? "line-through" : "" }>
								<input 
									className="mr-1.5" 
									type="checkbox" 
									onChange={handleCheck} 
									checked={checked} 
								/>
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
				</li>
		</>;
	}

}
