'use client'
import "@/app/globals.css";
import { useState } from 'react';
import ToDoList from "./todo_list";

export default function ToDoPage(){
	return <>
		<h1 className="text-sky-400 uppercase text-lg mb-4">To-Do List</h1>
		<ToDoList></ToDoList>
	</>;
}
