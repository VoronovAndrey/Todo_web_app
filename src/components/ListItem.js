import React from 'react'

function ListItem(props) {
    return (
        <div>
            <p onClick={() => props.click()}>{props.data.name}</p>
        </div>
    )
}

export default ListItem
