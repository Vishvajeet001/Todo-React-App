import React from 'react'
import tick from '../assets/tick.png'
import not_tick from '../assets/not_tick.png'
import del_icon from '../assets/delete.png'

// functional component to render todo items
const ToDoItems = ({text, id, status, del, toogle}) => {
  return (
    <div className='flex items-center my-3 gap-2'>
        <div onClick={()=>toogle(id)} className='flex flex-1 items-center cursor-pointer'>
            <img src={status?tick:not_tick} alt='' className='w-7'></img>
            <p className={`text-slate-700 ml-4 text-[17px] ${status?"line-through":""}`}>{text}</p>
        </div>  
        <img onClick={() => {del(id)}} src={del_icon} className='w-3.5 cursor-pointer'></img>
    </div>
  )
}

export default ToDoItems;