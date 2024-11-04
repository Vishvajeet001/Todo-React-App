import React, { useEffect, useRef, useState } from "react";
import icon from "../assets/todo_icon.png";
import ToDoItems from "./ToDoItems";

const ToDo = () => {
  // hooks
  // useRef for fetching input data
  const inputRef = useRef();
  // useState for storing todo list
  const [todolist, setTodolist] = useState(localStorage.getItem('todolist')?JSON.parse(localStorage.getItem('todolist')):[]);
  // useEffect for persisting the todo list in local storage
  useEffect(()=>{
    localStorage.setItem('todolist', JSON.stringify(todolist));
  },[todolist])

  // add functionality
  const add = () => {
     const inputText = inputRef.current.value.trim();
     const todoElement = {
      id:Date.now(),
      value: inputText,
      completed: false,
     }

     if (inputText === "") {
      return null;
     }

     setTodolist((prev) => [...prev, todoElement]);
     inputRef.current.value = "";
     
  }

  // delete functionality
  const del = (id) => {
    setTodolist((prev) => {
      return prev.filter((item) => item.id !== id);
    })
  };

  // toggle functionality
  const toogle = (id) => {
    setTodolist((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return {...item, completed:!item.completed};
        }
        return item;
      });
    })
  }

  // render the component
  return <>
    <div className="bg-slate-300 min-h-[550px] w-11/12 max-w-md p-7 rounded-2xl flex flex-col place-self-center">

      <div className="flex items-center mt-7 gap-2">
        <img className="w-8" src={icon} alt="todo icon"></img>
        <h1 className="text-3xl font-semibold">To-Do List</h1>
      </div>

      <div className="flex items-center my-7 bg-gray-200 rounded-full">
        <input ref={inputRef} className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600" type="text" placeholder="Enter task"/>
        <button onClick={add} className="border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer">ADD +</button>
      </div>

      <div>
        {todolist.map((item,idx) => {
          return <ToDoItems key={idx} text={item.value} id={item.id} status={item.completed} del={del} toogle={toogle}/>;
        })}
      </div>
    </div>
  </>;
};

export default ToDo;
