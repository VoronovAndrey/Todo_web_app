import React from 'react'

function TodoItem(props) {
    
    return (
        <div className='todo_item__wrap'>
            <div className='df aic'>
                <span className={`checkbox__span ${props.value ? 'checkbox__span__checked' : ''}`}
                    onClick={() => props.checkHandle()}
                ></span>
                <p style={{
                    textDecoration: props.value ? 'line-through' : 'none',
                    opacity: props.value ? '0.5' : '1'
                    }}>{props.text}</p>
            </div>
            <span className='todo_item__remove_btn'
                    onClick={() => props.removeHandle()}
            >
               <i className="far fa-trash-alt"></i>
            </span>
        </div>
    )
}

export default TodoItem
