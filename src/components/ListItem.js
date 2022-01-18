import React from 'react'

function ListItem(props) {
    const getProgress = () => {
        let listData = props.data.listData
        if ( listData.length > 0) {
            let completedCount = listData.filter(item => item.value === true).length
            let progress = 0
            if ( completedCount > 0) progress = ( completedCount/listData.length ) * 100
            return `${progress.toFixed(0)}%`
        } else {
            return ''
        }
    }
    return (
        <div className='list__item__wrapper' onClick={() => props.click()}>
            <div className='list__item__control' onClick={e => e.stopPropagation()}>
                <span onClick={props.editClick}>
                    <i className="fas fa-cog"></i>
                </span>
                <span style={{marginLeft: '7px'}} onClick={props.deletClick}>
                    <i className="fas fa-trash-alt"></i>
                </span>
            </div>
            <span className='bookmark'
                style={{background: `${props.data.color} linear-gradient(0deg, rgba(0, 0, 0, 0.2), transparent)`}}
            >
            </span>
            <p className='list__item__title'>{props.data.name}</p>
            <span className='list_progress'>
                {props.data.listData.length > 0 ? `Completed: ${getProgress()}` : 'Empty list' }
            </span>
        </div>
    )
}

export default ListItem
