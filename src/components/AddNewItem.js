import React from 'react'

function AddNewItem(props) {
    const text_ref = React.useRef('')
    const clickHandle = () => { 
        if (text_ref.current.value !== '') {
            props.addHandle(text_ref.current.value)
            text_ref.current.value = ''
        }
    }
    return (
        <div className='todo_item__add__wrapper'>
            <input className='todo_item__add__input' 
                    ref={text_ref}
                    placeholder='Task...' >
            </input>
            <button className='todo_item__add__btn' onClick={() => clickHandle()}>add</button>
        </div> 
    )
}

export default AddNewItem
