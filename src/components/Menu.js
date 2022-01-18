import React from 'react'
import { StoreManager } from '../context/Context'



function Menu(props) {
    const { data: { data } } = React.useContext(StoreManager)
    const [isOpen, setIsOpen] = React.useState(true);
    const arrow_style = {
        marginLeft: 'auto',
        transform: `rotate${isOpen ? '(180deg)' : '(0deg)'}`,
        transition: 'all 0.2s'
    }
    const [menuIsOpen, setMenuIsOpen] = React.useState(false)
    const burgerMenuStyle = {
        left: menuIsOpen ? 0 : '-100%',
        visibility:  menuIsOpen ? 'visible': 'hidden'
    }
    const [ScreenWidth, setScreenWidth] = React.useState()

    React.useEffect(() => {
        const getScreenWidth = () => setScreenWidth(window.innerWidth)
        getScreenWidth()
        window.addEventListener('resize', getScreenWidth)
        return () => {
            window.removeEventListener('resize', getScreenWidth)
        }
    }, [])
    return (
        <>  
            <span className='burger_btn' onClick={() => setMenuIsOpen(!menuIsOpen)}>
                <i className={ menuIsOpen ? "fas fa-times" : "fas fa-bars"}></i>
            </span>
            {menuIsOpen && (ScreenWidth <= 768) && (
                <div className='overlay' onClick={() => setMenuIsOpen(false)}></div>
            )}
            <div className='menu__container' style={ScreenWidth > 768 ? {} : burgerMenuStyle}>
                <p className='Logo__wrapper'>
                    <a href='/' className='Logo'>
                        <span>
                            <i className="far fa-check-square"></i>
                        </span>
                        Tasks.
                    </a>
                </p>
                <div className='main_menu__container' onClick={() => setMenuIsOpen(false)}>
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
                            }}
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
                                    if (index <=4) {
                                        return <li key={index}
                                            onClick={() => props.click(index)}
                                            className='menu__item'
                                        >
                                            <span className='circle submenu__span'
                                                style={{ background: list.color }}></span>
                                            {list.name}
                                        </li>
                                    } else if (index === 5) {
                                        return <li key={index}
                                            onClick={() => props.click(null)}
                                            className='menu__item'
                                        >
                                            <span className=' submenu__span'
                                                style={{ background: 'transparent' }}>
                                                    <i className="fas fa-angle-right"></i>
                                                </span>
                                            All lists
                                        </li>
                                    } else {
                                        return null
                                    }
                                })}
                        </ul>
                    )}
                </div>
            </div>
        </>
    )
}

export default Menu
