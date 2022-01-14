import React from 'react'
import { StoreManager } from '../context/Context'

function NewListModal(props) {
   const listName_ref = React.useRef('')
   const {colors : {colors}} = React.useContext(StoreManager)
   const [currentColor, setCurrentColor] = React.useState(0)
   const addClickHandler = () => {
        // props.addNewList(title, color)
        let title = listName_ref.current.value
        if ( title.trim() !== '' ) {
            props.addNewList(title, colors[currentColor])
            listName_ref.current.value = ''
            props.closeModal()
        }
   }

    return (
        <>
            <div className='overlay' onClick={props.closeModal}>
                <div className='modal__body' onClick={e => e.stopPropagation()}>
                    <h2 style={{textAlign: 'center'}}>New list</h2>
                    <input ref={listName_ref} placeholder='Title' className='modal__input'></input>
                    <div className='df aic colors__container'>
                        <span>Color:</span>
                        {colors.map((color, idx) => {
                            return <span className='circle__modal'
                                            key={idx}
                                            onClick={() => setCurrentColor(idx)}
                                            style={{
                                                background: color,
                                                border: `3px solid ${
                                                    idx === currentColor ? 'rgba(255, 255, 255, 0.5)' : 'transparent'
                                                }`
                                            }}
                            ></span>
                        })}

                    </div>
                     {/* onClick={addNewList} */}
                     <div className='modal__btn__container df aic'>
                        <button 
                            className='modal__btn modal__btn_add' 
                            onClick={() => addClickHandler()}
                        >Add</button>
                        <button className='modal__btn'
                            onClick={props.closeModal}
                        >Close</button>
                     </div>
                </div>
            </div>
        </>
    )
}

export default NewListModal
