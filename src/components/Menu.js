import React from 'react'
import { StoreManager } from '../context/Context'

function Menu(props) {
    const {data: {data}} = React.useContext(StoreManager)
    const [isOpen, setIsOpen] = React.useState(true);
    const arrow_style = {
        marginLeft: 'auto',
        transform: `rotate${ isOpen ? '(180deg)' : '(0deg)' }`,
        transition: 'all 0.2s'
    }
    return (
        <div className='menu__container'>
            <p className='Logo__wrapper'>
                <a href='/' className='Logo'>
                        <span>
                            <i className="far fa-check-square"></i>
                        </span>
                        Tasks.
                </a>
            </p>
            <div className='main_menu__container'>
                <p onClick={() => props.click(null)}
                    className='menu__item df'
                >
                    <span className='menu__item__span'>
                        <i className="fas fa-list-ul"></i>
                    </span>
                    Lists
                    <span style={arrow_style}
                            onClick={(e) => {
                                e.stopPropagation()
                                setIsOpen(!isOpen)
                            } }
                        >
                        <i className="fas fa-angle-down"></i>
                    </span>
                </p>
                {isOpen && (
                    <ul className='submenu'>
                        <li className='menu__item' onClick={props.addClick}> 
                            <span className='submenu__span'>
                                <i className="fas fa-plus"></i>
                            </span>
                                New list
                        </li>
                        {
                            data.map((list, index) => {
                                return <li key={index}
                                    onClick={() => props.click(index)}
                                    className='menu__item'
                                >
                                    <span className='circle submenu__span'
                                        style={{background: list.color}}></span>
                                    {list.name}
                                </li>
                            })}
                    </ul>
                )}
                <p className='menu__item df'>
                    <span className='menu__item__span'>
                        <i className="fas fa-question"></i>
                    </span>
                    About
                </p>
            </div>

        </div>
    )
}

export default Menu
