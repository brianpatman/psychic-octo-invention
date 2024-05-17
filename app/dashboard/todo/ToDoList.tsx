'use client';
import { useRef, useState } from "react";
import ToDoListItem from "./ToDoListItem";

export default function ToDoList(){
	let API_DATA = [
		{id:"1", name:"Laundry"},
		{id:"2", name:"Groceries"},
		{id:"3", name:"Federal Tax Return"}
	];

	const [itemData,setItemData] = useState(API_DATA);
	const [showCompleted,toggleCompleted] = useState(false);
	const [ariaLive,setAriaLive] = useState("");
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

		// Updating a state with a "normal" call. 
		//
		// Instructor in my course says to always use an updater function, but
		// the react documentation disagrees, so I've kept both methods here
		// for posterity 
		// https://react.dev/reference/react/useState#updating-state-based-on-the-previous-state
		// 
		// setItemData([
		// 	...itemData,
		// 	{ id: crypto.randomUUID(), name: itemName }
		// ]);


		// Updating State with an Updater Function
		//
		// Use this to update a state based on the previous state;
		// this ensures that, in the case of multiple queued state updates,
		// that the state isn't updated based on an older value of the state
		//
		// TODO: !!!! ADD A BULK IMPORT OPTION THAT ALLOWS USERS TO ADD MULTIPLE
		//            TO DO LIST ITEMS AT ONCE, THEREBY TRIGGERING THE UNDESIRABLE
		//            BEHAVIOR THAT MAKES AN UPDATER FUNCTION NECESSARY
		//
		setItemData( (existingItemData) => [
			...existingItemData,
			{ id: crypto.randomUUID(), name: itemName }
		]);

		setAriaLive(`Added item ${itemName}.`)
	}

	function showHideCompleted(){
		toggleCompleted(showCompleted => !showCompleted);

		if(showCompleted){
			setAriaLive('Completed Items set to not be Shown');
		}
		else{
			setAriaLive('Completed Items set to be Shown');
		}
	}

	// const dragItem = useRef<any>();
	// const dragOverItem = useRef<any>();

	// function dragStart(e:React.FormEvent<HTMLFormElement>){
	// 	console.log(e);
	// 	// dragItem.current = e.target;
	// }

	// function dragEnter(e:React.FormEvent<HTMLFormElement>){
	// 	console.log(e);
	// 	// dragOverItem.current = e.currentTarget;
	// }

	// function dropItem(){
	// 	const listItems = [...itemData];
	// 	const dragItemContent = listItems[dragItem.current];

	// 	let dragItemIndex = 0;
	// 	let dragOverItemIndex = 0;

	// 	listItems.forEach( (element, index, array) => {
	// 		if(element.id == dragItem.current){
	// 			dragItemIndex = index;
	// 		}

	// 		if(element.id == dragOverItem.current){
	// 			dragOverItemIndex = index;
	// 		}
	// 	});

	// 	listItems.splice(dragItemIndex,1);
	// 	listItems.splice(dragOverItemIndex,0,dragItemContent)

	// 	dragItem.current = null
	// 	dragOverItem.current = null
	// 	setItemData(listItems);
	// }

	console.log(itemData.length);

	return <>
		{ itemData.length > 0 && (
			<>
			<div className="controls rounded bg-blue-400 px-2 py-3 mb-2 border border-blue-600">
				<label>			
					<input className="mr-1.5" type="checkbox" onChange={showHideCompleted} />
					Show Completed Items
				</label>
			</div>

			<ul>
				{ 
					itemData.map( item =>
						<ToDoListItem 
							key={item.id} 
							id={item.id}
							name={item.name} 
							showCompleted={showCompleted} 
							ToDos={itemData} 
							setToDos={setItemData}
							setAriaLive={setAriaLive}
							// onDragStart={(e) => dragStart(e)}
							// onDragEnter={(e) => dragEnter(e)}
							// onDragEnd={dropItem}
							// draggable 
						/>
					)
				}
			</ul>
			</>
		)};

		{itemData.length == 0 &&(
			<div>
				<h2>No Items on your ToDo List!</h2>
				<p>Surely you have <em>something</em> you need to do?</p>
			</div>
		)};
		

		{ 
			/* 
				TODO: !!! - Add a conditional that shows some other HTML when all 
				tasks on the list are complete.
			*/
		}

		<form 
			className="add-item-dialog my-5" 
			ref={formRef}
			onSubmit={(event) => handleAddItem(event)}
		>
			<label>
				<span className="block mb-1 font-bold">Item to Add</span>
				<input className="text-black p-2 mr-2.5 rounded" type="text" name="itemname" />
			</label>
			<button className="rounded bg-blue-600 px-4 py-2">Add Item</button>
		</form>


		<div role="status" aria-live="polite" id="feedback" className="sr-only">
			{ariaLive}
		</div>
	</>;
}
