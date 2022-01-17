import React from 'react'
import { StoreManager } from '../context/Context'

function Filter({colorFilter, setColorFilter}) {
    const {colors: {colors}} = React.useContext(StoreManager)
    return (
        <div>
            {colors.map((item, idx) => {
                return (
                    <span className='circle__modal'
                        style={{
                            background: item,
                            border: `3px solid ${item === colorFilter ? 'rgba(0, 0, 0, 0.3)' : 'transparent'
                                }`
                        }}
                        key={idx}
                        onClick={() => setColorFilter(item)}
                    ></span>
                )
            })}
            <span className=''
                style={{
                    opacity: colorFilter === null ? '1' : '0.4'
                }}
                onClick={() => setColorFilter(null)}
            >All</span>
        </div>
    )
}

export default Filter
