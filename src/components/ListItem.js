import React from 'react'

function ListItem(props) {
    return (
        <div className='list__item__wrapper' onClick={() => props.click()}>
            <div className='list__item__control' onClick={e => e.stopPropagation()}>
                <span onClick={props.editClick}>
                    <i className="fas fa-cog"></i>
                </span>
                <span style={{marginLeft: '7px'}} onClick={props.deletClick}>
                    <i className="fas fa-trash-alt"></i>
                    {/* <i className="far fa-trash-alt"></i> */}
                </span>
            </div>
            <span className='bookmark'
                style={{background: `${props.data.color} linear-gradient(0deg, rgba(0, 0, 0, 0.2), transparent)`}}
            >
            </span>
            <p className='list__item__title'>{props.data.name}</p>
        </div>
    )
}

export default ListItem
