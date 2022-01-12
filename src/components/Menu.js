import React from 'react'
import { StoreManager } from '../context/Context'

function Menu(props) {
    const {data: {data}} = React.useContext(StoreManager)
    return (
        <div className='menu__container'>
            <p onClick={() => props.click(null)}>Projects</p>
            <ul>
                {
                    data.map((list, index) => {
                        return <li key={index}
                                onClick={() => props.click(index)}
                        >{list.name}</li>
                    })}
            </ul>

        </div>
    )
}

export default Menu
