import React from 'react'

function ListItem(props) {
    return (
        <div className='list__item__wrapper' onClick={() => props.click()}>
            <div className='list__item__control' onClick={e => e.stopPropagation()}>
                <span>
                    <i className="fas fa-cog"></i>
                </span>
                <span style={{marginLeft: '5px'}}>
                    <i className="far fa-trash-alt"></i>
                </span>
            </div>
            <span className='bookmark'
                style={{background: props.data.color}}
            >
            </span>
            <p className='list__item__title'>{props.data.name}</p>
        </div>
    )
}

export default ListItem
