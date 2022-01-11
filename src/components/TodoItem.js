import React from 'react'

function TodoItem(props) {
    
    return (
        <div className='todo_item__wrap'>
            <input type={'checkbox'} readOnly checked={props.value} onClick={() => props.checkHandle()}/>
            <p style={{textDecoration: props.value ? 'line-through' : 'none'}}>{props.text}</p>
            <span className='todo_item__remove_btn'
                    onClick={() => props.removeHandle()}
            >
               <i className="far fa-trash-alt"></i>
            </span>
        </div>
    )
}

export default TodoItem
