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
        <div>
            <input ref={text_ref}></input>
            <button onClick={() => clickHandle()}>add</button>
        </div>
    )
}

export default AddNewItem
